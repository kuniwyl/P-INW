from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializer import ProjectsFilesSerializer
from .models import ProjectsFiles, Projects


class AddProjectFilesView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFilesSerializer
		parser_classes = [FormParser, MultiPartParser, ]

		def post(self, request, format=None):
				pfile_name = request.data['pfile_name']
				pfile_file = request.data['pfile_file']
				if request.data['project_id']:
						project = Projects.objects.filter(id=request.data['project_id'])[0]
				else:
						project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFiles.objects.filter(pfile_name=pfile_name, project=project)

				if not queryset.exists():
						projectFiles = ProjectsFiles(pfile_name=pfile_name, pfile_file=pfile_file, project=project)
						projectFiles.save()
						return Response({"Success": f"Created project file {projectFiles.pfile_name}"}, status=status.HTTP_201_CREATED)
				else:
						return Response({"Error": f"Project file already exist"}, status=status.HTTP_409_CONFLICT)


class GetSingleProjectFilesView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFilesSerializer
		
		def post(self, request, format=None):
				queryset = ProjectsFiles.objects.filter(id=request.data['project_file_id'])
				if queryset.exists():
						file = queryset[0]
						data = file.pfile_file.read()
						return Response({'file': data}, status=status.HTTP_200_OK)
				else:
						return Response({"Error": f"User do not have any projects"}, status=status.HTTP_400_BAD_REQUEST)


class GetProjectFilesView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFilesSerializer
		
		def post(self, request, format=None):
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFiles.objects.filter(project=project)
				if queryset.exists():
						data = [ProjectsFilesSerializer(elem).data for elem in queryset]
						return Response(data, status=status.HTTP_200_OK)
				else:
						return Response({"Error": f"User do not have any projects"}, status=status.HTTP_400_BAD_REQUEST)


class EditProjectFilesView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFilesSerializer

		def post(self, request, format=None):
				new_name = request.data['new_name']
				id = request.data['project_file_id']
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFiles.objects.filter(id=id, project=project)

				if queryset.exists():
						projectFiles = queryset[0]
						projectFiles.pfile_name = new_name
						projectFiles.save()
						return Response({"Success": f"Renamed project {projectFiles.pfile_name}"}, status=status.HTTP_202_ACCEPTED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)


class DelProjectFilesView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFilesSerializer

		def post(self, request, format=None):
				id = request.data['project_file_id']
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFiles.objects.filter(id=id, project=project)
				if queryset.exists():
						projectFiles = queryset[0]
						data = ProjectsFilesSerializer(projectFiles).data
						projectFiles.delete()
						return Response({"Success": f"Project {projectFiles.pfile_name} deleted", "project": data}, status=status.HTTP_201_CREATED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)
			
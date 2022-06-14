from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializer import ProjectsFiguresSerializer
from .models import ProjectsFigures, Projects


class AddProjectFiguresView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFiguresSerializer

		def post(self, request, format=None):
				pfig_name = request.data['pfig_name']
				pfig_file = request.data['pfig_file']
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFigures.objects.filter(pfig_name=pfig_name, pfig_file=pfig_file)

				if not queryset.exists():
						projectFigures = ProjectsFigures(pfig_name=pfig_name, pfig_file=pfig_file, project=project)
						projectFigures.save()
						return Response({"Success": f"Created project file {projectFigures.pfig_name}"}, status=status.HTTP_201_CREATED)
				else:
						return Response({"Error": f"Project file already exist"}, status=status.HTTP_409_CONFLICT)


class GetProjectFiguresView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFiguresSerializer
		
		def post(self, request, format=None):
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFigures.objects.filter(project=project)
				if queryset.exists():
						data = [ProjectsFiguresSerializer(elem).data for elem in queryset]
						return Response(data, status=status.HTTP_200_OK)
				else:
						return Response({"Error": f"User do not have any projects"}, status=status.HTTP_400_BAD_REQUEST)


class EditProjectFiguresView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFiguresSerializer

		def post(self, request, format=None):
				new_name = request.data['new_name']
				id = request.data['project_file_id']
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFigures.objects.filter(id=id, project=project)

				if queryset.exists():
						projectFigures = queryset[0]
						projectFigures.pfig_name = new_name
						projectFigures.save()
						return Response({"Success": f"Renamed project {projectFigures.pfig_name}"}, status=status.HTTP_202_ACCEPTED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)


class DelProjectFiguresView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsFiguresSerializer

		def post(self, request, format=None):
				id = request.data['project_id']
				project = Projects.objects.filter(id=request.data['project_id'])[0]
				queryset = ProjectsFigures.objects.filter(id=id, project=project)
				if queryset.exists():
						projectFigures = queryset[0]
						data = ProjectsFiguresSerializer(projectFigures).data
						projectFigures.delete()
						return Response({"Success": f"Project {projectFigures.project_name} deleted", "project": data}, status=status.HTTP_202_ACCEPTED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)
			
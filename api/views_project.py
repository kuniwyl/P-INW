from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from core.user.models import User
from .serializer import ProjectsSerializer
from .models import Projects


class AddProjectView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsSerializer

		def post(self, request, format=None):
				project_name = request.data['project_name']
				user = User.objects.filter(id=request.data['user'])
				user = user[0]
				queryset = Projects.objects.filter(user=user, project_name=project_name)

				if not queryset.exists():
						project = Projects(user=user, project_name=project_name)
						project.save()
						return Response({"Success": f"Created project {project.project_name}"}, status=status.HTTP_201_CREATED)
				else:
						return Response({"Error": f"Project already exist"}, status=status.HTTP_409_CONFLICT)


class EditProjectView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsSerializer

		def post(self, request, format=None):
				new_name = request.data['new_name']
				id = request.data['project_id']
				user = User.objects.filter(id=request.data['user'])
				user = user[0]
				queryset = Projects.objects.filter(user=user, id=id)

				if queryset.exists():
						project = queryset[0]
						project.project_name = new_name
						project.save()
						return Response({"Success": f"Renamed project {project.project_name}"}, status=status.HTTP_202_ACCEPTED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)


class DelProjectView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsSerializer

		def post(self, request, format=None):
				id = request.data['project_id']
				user = User.objects.filter(id=request.data['user'])[0]
				queryset = Projects.objects.filter(user=user, id=id)
				if queryset.exists():
						project = queryset[0]
						data = ProjectsSerializer(project).data
						project.delete()
						return Response({"Success": f"Project {project.project_name} deleted", "project": data}, status=status.HTTP_201_CREATED)
				else:
						return Response({"Error": f"Project not exist"}, status=status.HTTP_404_NOT_FOUND)
				

class GetProjectView(APIView):
		permission_classes = (IsAuthenticated, )
		serializer_class = ProjectsSerializer
		
		def post(self, request, format=None):
				user = User.objects.filter(id=request.data['user'])[0]
				queryset = Projects.objects.filter(user=user)
				if queryset.exists():
						data = [ProjectsSerializer(elem).data for elem in queryset]
						return Response(data, status=status.HTTP_200_OK)
				else:
						return Response({"Error": f"User do not have any projects"}, status=status.HTTP_400_BAD_REQUEST)


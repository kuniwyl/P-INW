from rest_framework import serializers
from .models import Projects, ProjectsFigures, ProjectsFiles


class ProjectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projects
        fields = ('id', 'project_name')


class ProjectsFilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectsFiles
        fields = ('id', 'pfile_name', 'pfile_file', 'project')


class ProjectsFiguresSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectsFigures
        fields = ('id', 'pfig_name', 'pfig_file', 'pfig_location', 'project')

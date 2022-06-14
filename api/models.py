from django.db import models
from core.user.models import User


class Projects(models.Model):
    project_name = models.TextField()
    user = models.ForeignKey(User, models.CASCADE)


class ProjectsFiles(models.Model):
    pfile_name = models.TextField()
    pfile_file = models.FileField()
    project = models.ForeignKey(Projects, models.CASCADE)


class ProjectsFigures(models.Model):
    pfig_name = models.TextField()
    pfig_file = models.FileField()
    project = models.ForeignKey(Projects, models.CASCADE)
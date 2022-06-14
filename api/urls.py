from django.urls import path
import api.views_project as views_project
import api.views_project_files as views_project_files
import api.views_project_file_edition as views_project_file_edition
import api.views_project_figures as views_project_figures

urlpatterns = [
    path('project/add', views_project.AddProjectView.as_view()),
    path('project/get', views_project.GetProjectView.as_view()),
    path('project/edit', views_project.EditProjectView.as_view()),
    path('project/del', views_project.DelProjectView.as_view()),

    path('project/file/add', views_project_files.AddProjectFilesView.as_view()),
    path('project/file/get', views_project_files.GetProjectFilesView.as_view()),
    path('project/file/edit', views_project_files.EditProjectFilesView.as_view()),
    path('project/file/del', views_project_files.DelProjectFilesView.as_view()),
    path('project/file/get/single', views_project_files.GetSingleProjectFilesView.as_view()),
    
    path("project/file/save", views_project_file_edition.ProjectFilesSaveView.as_view()),
    path("project/file/options/edit", views_project_file_edition.ProjectFilesEditionView.as_view()),

    path('project/figure/add', views_project_figures.AddProjectFiguresView.as_view()),
    path('project/figure/get', views_project_figures.GetProjectFiguresView.as_view()),
    path('project/figure/edit', views_project_figures.EditProjectFiguresView.as_view()),
    path('project/figure/del', views_project_figures.DelProjectFiguresView.as_view()),
]

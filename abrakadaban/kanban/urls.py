from django.conf.urls import patterns, url
from django.views.generic import TemplateView
import views

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='kanban/index.haml'), name='home'),
    url(r'^kanban.js$', TemplateView.as_view(template_name="kanban/kanban.js"), name='kanbanjs'),
    url(r'^workspace.json$', views.workspacejson, name='workspacejson'),
    url(r'^workspaces.html$', TemplateView.as_view(template_name='kanban/workspace.haml'), name='workspacelist'),
    url(r'^workspace.html$', TemplateView.as_view(template_name='kanban/workspace.haml'), name='workspaceview'),
)

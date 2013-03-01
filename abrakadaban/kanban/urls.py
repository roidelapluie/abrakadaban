from django.conf.urls import patterns, url
from django.views.generic import TemplateView


urlpatterns = patterns('views',
    url(r'^$', TemplateView.as_view(template_name='kanban/index.haml'), name='home'),
    url(r'^kanban.js$', TemplateView.as_view(template_name="kanban/kanban.js"), name='kanbanjs'),
    url(r'^workspace.json$', 'workspacejson', name='workspacejson'),
    url(r'^workspaces.html$', TemplateView.as_view(template_name='kanban/workspace.haml'), name='workspacelist'),
    url(r'^workspace.html$', TemplateView.as_view(template_name='kanban/workspace.haml'), name='workspaceview'),
)

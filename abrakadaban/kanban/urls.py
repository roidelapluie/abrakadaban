from django.conf.urls import patterns, url
from django.views.generic import TemplateView

urlpatterns = patterns('kanban.views',
    url(r'^$', TemplateView.as_view(template_name='kanban/index.haml'), name='home'),
    url(r'^kanban.js$', TemplateView.as_view(template_name="kanban/kanban.js"), name='kanbanjs'),
    url(r'^workspace.json$', 'workspacesjson', name='workspacesjson'),
    url(r'^workspaces$', TemplateView.as_view(template_name='kanban/index.haml'), name='workspacejson'),
    url(r'^workspaces/(\d+)$', 'workspacejson'),
    url(r'^workspaces.html$', TemplateView.as_view(template_name='kanban/workspaces.haml'), name='workspacelist'),
    url(r'^workspace.html$', TemplateView.as_view(template_name='kanban/workspace.haml'), name='workspaceview'),
)

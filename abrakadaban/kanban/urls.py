from django.conf.urls import patterns, url
from django.views.generic import TemplateView
urlpatterns = patterns('kanban.views',
    url(r'^$', TemplateView.as_view(template_name='index.haml'), name='home'),
    url(r'^urls.js$', TemplateView.as_view(template_name="kanban/kanban.js"), name='kanbanjs'),
    url(r'^user.json$', 'user_login', name = 'user_login'),
    url(r'^templates/workspace_list.html$', TemplateView.as_view(template_name='kanban/workspace_list.haml'), name='template_workspace_list'),
    url(r'^templates/workspace_view.html$', TemplateView.as_view(template_name='kanban/workspace_view.haml'), name='template_workspace_view'),
)

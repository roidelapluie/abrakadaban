from django.conf.urls import patterns, include, url
from kanban import urls as kanban_urls

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from kanban.api import IdeaResource, WorkspaceResource, WorkflowResource, CommentResource, UserResource
from tastypie.api import Api

v1_api = Api(api_name='1.0')
v1_api.register(IdeaResource())
v1_api.register(WorkspaceResource())
v1_api.register(WorkflowResource())
v1_api.register(CommentResource())
v1_api.register(UserResource())


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'abrakadaban.views.home', name='home'),
    # url(r'^abrakadaban/', include('abrakadaban.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^', include(kanban_urls, namespace='kanban')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(v1_api.urls)),
)

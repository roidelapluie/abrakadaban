from django.conf.urls import patterns, include, url
import views

urlpatterns = patterns('',
    url(r'^$', views.home, name='home'),
    url(r'^kanban.js$', views.kanbanjs, name='kanbanjs'),
    url(r'^workspace.json$', views.workspacejson, name='workspacejson'),
)

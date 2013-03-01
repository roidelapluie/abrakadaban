from django.conf.urls import patterns, include, url
import views

urlpatterns = patterns('',
    url(r'^kanban.js$', views.kanbanjs, name='kanbanjs'),
    url(r'^$', views.home, name='home'),
)

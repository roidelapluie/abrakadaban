from django.conf.urls import patterns, include, url
import views

urlpatterns = patterns('',
    url(r'^kanban.js$', views.home, name='js'),
    url(r'^$', views.home, name='home'),
)

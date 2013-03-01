from models import Idea, Comment, Workspace, Workflow
from django.contrib import admin
from django.contrib.auth.models import Group


class IdeaAdmin(admin.ModelAdmin):
    filter_horizontal=["members", "subscribers"]

class WorkspaceAdmin(admin.ModelAdmin):
    filter_horizontal=["members", "workflow"]

admin.site.register(Workspace, WorkspaceAdmin)
admin.site.register(Idea, IdeaAdmin)
admin.site.register(Workflow)
admin.site.register(Comment)
admin.site.unregister(Group)

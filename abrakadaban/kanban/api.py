from tastypie.resources import ModelResource
from kanban.models import Idea, Comment, Workspace, Workflow
from django.contrib.auth.models import User
from tastypie.authentication import SessionAuthentication
from tastypie import fields


class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['id', 'username', 'first_name', 'last_name', 'last_login']
        allowed_methods = ['get']
        authentication = SessionAuthentication()

class WorkflowResource(ModelResource):
    class Meta:
        queryset = Workflow.objects.all()

class WorkspaceResource(ModelResource):
    workflow = fields.ToManyField(WorkflowResource, 'workflow', full=True)
    members = fields.ToManyField(UserResource, 'members', full=True)
    idea = fields.ToManyField('kanban.api.IdeaResource', 'idea_set', related_name='workspace', full=True)
    class Meta:
        queryset = Workspace.objects.all()

class IdeaResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    subscribers = fields.ToManyField(UserResource, 'subscribers', full=True)
    workspace = fields.ToOneField(WorkspaceResource, 'workspace')
    workflow = fields.ToOneField(WorkflowResource, 'workflow', full=True)
    members = fields.ToManyField(UserResource, 'members', full=True)
    class Meta:
        queryset = Idea.objects.all()

class CommentResource(ModelResource):
    idea = fields.ToOneField(IdeaResource, 'idea', full=True)
    user = fields.ToOneField(UserResource, 'user', full=True)
    class Meta:
        queryset = Comment.objects.all()

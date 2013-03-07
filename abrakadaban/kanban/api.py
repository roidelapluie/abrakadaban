from tastypie.resources import ModelResource
from kanban.models import Idea, Comment, Workspace, Workflow
from django.contrib.auth.models import User
from tastypie.authentication import SessionAuthentication
from tastypie import fields
from tastypie.authorization import Authorization

class UserAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list.filter(username=bundle.request.user.username)

class WorkspaceAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        return object_list.filter(members__username=bundle.request.user.username)

class IdeaAuthorization(Authorization):
    def read_detail(self, object_list, bundle):
        return True
    def update_detail(self, object_list, bundle):
        return True

class UserResource(ModelResource):
    class Meta:
        queryset = User.objects.all()
        fields = ['id', 'username', 'first_name', 'last_name', 'last_login']
        allowed_methods = ['get']
        authentication = SessionAuthentication()
        authorization = UserAuthorization()

class WorkflowResource(ModelResource):
    class Meta:
        queryset = Workflow.objects.all()
        authorization= Authorization()

class WorkspaceResource(ModelResource):
    workflow = fields.ToManyField(WorkflowResource, 'workflow', full=True)
    members = fields.ToManyField(UserResource, 'members', full=True)
    idea = fields.ToManyField('kanban.api.IdeaResource', 'idea_set', related_name='workspace', full=True)
    class Meta:
        authorization = WorkspaceAuthorization()
        queryset = Workspace.objects.all()

class IdeaResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user', full=True)
    subscribers = fields.ToManyField(UserResource, 'subscribers', full=True)
    workspace = fields.ToOneField(WorkspaceResource, 'workspace')
    workflow = fields.ToOneField(WorkflowResource, 'workflow', full=True)
    members = fields.ToManyField(UserResource, 'members', full=True)
    class Meta:
        queryset = Idea.objects.all()
        #authentication = SessionAuthentication()
        authorization= IdeaAuthorization()



class CommentResource(ModelResource):
    idea = fields.ToOneField(IdeaResource, 'idea', full=True)
    user = fields.ToOneField(UserResource, 'user', full=True)
    class Meta:
        queryset = Comment.objects.all()
        authorization= Authorization()

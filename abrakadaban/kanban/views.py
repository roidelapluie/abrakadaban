from django.http import HttpResponse
from models import Workspace, Workflow, Idea
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from serializers import IdeaSerializer, WorkspaceSerializer, WorkflowSerializer, UserSerializer
from django.contrib.auth.models import User
import json
from django.contrib.auth import authenticate, login, logout

def check_access(workspace_id, user):
    if user in Workspace.objects.get(id=workspace_id).members.all():
        return True
    else:
        return False

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders it's content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


@csrf_exempt
def model_list(request, objects, serializerClass):
    if request.method == 'GET':
        serializer = serializerClass(objects, many=True)
        return JSONResponse(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = serializerClass(data=data)
        if serializer.is_valid():
            serializer.save()
            return JSONResponse(serializer.data, status=201)
        else:
            return JSONResponse(serializer.errors, status=400)

def workspace_list(request):
    if request.user.is_authenticated():
        objects = request.user.workspace_set.all()
    else:
        objects = ()
    return model_list(request, objects, WorkspaceSerializer)

def workspace_view(request, workspace_id):
    if check_access(workspace_id, request.user):
        objects = Workspace.objects.filter(id=workspace_id)
    else:
        objects = ()
    return model_list(request, objects, WorkspaceSerializer)

def workflow_view(request, workspace_id):
    if check_access(workspace_id, request.user):
        objects = Workspace.objects.get(id=workspace_id).workflow.all()
    else:
        objects = ()
    return model_list(request, objects, WorkflowSerializer)

def empty_list(request):
    objects = ()
    return model_list(request, objects, WorkflowSerializer)

def idea_list(request):
    objects = ()
    return model_list(request, objects, IdeaSerializer)

@csrf_exempt
def idea_view(request, workspace_id):
    if check_access(workspace_id, request.user):
        objects = Workspace.objects.get(id=workspace_id).idea_set.all()
    else:
        objects = ()
    return model_list(request, objects, IdeaSerializer)

@csrf_exempt
def user_info(request):
    if request.method == 'GET':
        if request.user:
            objects = (request.user,)
        else:
            objects = ()
        return model_list(request, objects, UserSerializer)
    elif request.method == 'POST':
        POST=json.loads(request.body)
        if POST['action'] == 'login':
            try:
                username = POST['username']
                password = POST['password']
            except:
                return JSONResponse({}, status=403)
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    serializer = UserSerializer((user,), many=True)
                    return JSONResponse(serializer.data)
                else:
                    return JSONResponse({}, status=403)
            else:
                return JSONResponse({}, status=403)
        else:
            logout(request)
            return JSONResponse({})


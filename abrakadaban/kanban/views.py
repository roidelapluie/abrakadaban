from django.http import HttpResponse
from models import Workspace, Workflow
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from serializers import IdeaSerializer, WorkspaceSerializer, WorkflowSerializer, UserSerializer
from django.contrib.auth.models import User
import json
from django.contrib.auth import authenticate, login, logout

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
    objects = Workspace.objects.all()
    return model_list(request, objects, WorkspaceSerializer)

def workspace_view(request, workspace_id):
    objects = Workspace.objects.filter(id=workspace_id)
    return model_list(request, objects, WorkspaceSerializer)

def workflow_view(request, workspace_id):
    objects = Workspace.objects.get(id=workspace_id).workflow.all()
    return model_list(request, objects, WorkflowSerializer)

def workflow_list(request):
    objects = Workspace.objects.all()
    return model_list(request, objects, WorkflowSerializer)

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


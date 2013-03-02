from django.http import HttpResponse
from models import Workspace, Workflow
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from serializers import IdeaSerializer, WorkspaceSerializer, WorkflowSerializer

class JSONResponse(HttpResponse):
    """
    An HttpResponse that renders it's content into JSON.
    """
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def model_list(request, model, serializerClass, model_id=None):
    if request.method == 'GET':
        if model_id:
            objects = model.objects.filter(id=model_id)
        else:
            objects = model.objects.all()
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
    return model_list(request, Workspace, WorkspaceSerializer)

def workspace_view(request, workspace_id):
    return model_list(request, Workspace, WorkspaceSerializer, workspace_id)

def workflow_view(request, workflow_id):
    return model_list(request, Workflow, WorkflowSerializer, workflow_id)

def workflow_list(request):
    return model_list(request, Workflow, WorkflowSerializer)

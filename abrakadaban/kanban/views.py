from django.http import HttpResponse
from models import Workspace
import json

def workspacesjson(request):
    workspaces = Workspace.objects.all()
    response_data = []
    for workspace in workspaces:
        response_data.append({'id': workspace.id, 'title': workspace.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def workspacejson(request, workspace_id):
    workspace = Workspace.objects.get(id=workspace_id)
    response_data = {'title': workspace.get_title(), 'workflows': []}
    for workflow in workspace.workflow.all():
        response_data['workflows'].append({'id': workflow.id, 'title': workflow.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

from django.shortcuts import render
from django.http import HttpResponse
from models import Workspace
import json

def home(request):
    return render(request, 'kanban/index.haml')

def workspacelist(request):
    return render(request, 'kanban/workspaces.haml')

def workspaceview(request):
    return render(request, 'kanban/workspace.haml')

def kanbanjs(request):
    return render(request, 'kanban/kanban.js')

def workspacesjson(request):
    workspaces = Workspace.objects.all()
    response_data = []
    for workspace in workspaces:
        response_data.append({'id': workspace.id, 'title': workspace.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def workspacejson(request, workspace_id):
    workspace = Workspace.objects.get(id=workspace_id)
    response_data = {'name': workspace.get_title(), 'workflows': []}
    for workflow in workspace.workflow.all():
        response_data['workflows'].append({'id': workflow.id, 'title': workflow.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

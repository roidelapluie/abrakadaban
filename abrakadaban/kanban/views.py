from django.shortcuts import render
from django.http import HttpResponse
from models import Workspace
import json

def home(request):
    return render(request, 'kanban/index.html')

def workspacejson(request):
    workspaces = Workspace.objects.all()
    response_data = []
    for workspace in workspaces:
        response_data.append({'id': workspace.id, 'name': workspace.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

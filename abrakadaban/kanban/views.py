from django.http import HttpResponse
from models import Workspace
import json

def workspacejson(request):
    workspaces = Workspace.objects.all()
    response_data = []
    for workspace in workspaces:
        response_data.append({'id': workspace.id, 'title': workspace.get_title()})
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

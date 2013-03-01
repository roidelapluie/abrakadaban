from django.shortcuts import render

def home(request):
    return render(request, 'kanban/index.html')

def kanbanjs(request):
    return render(request, 'kanban/kanban.js')

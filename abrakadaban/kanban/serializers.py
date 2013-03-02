from rest_framework import serializers
from models import Idea, Workflow, Workspace, Comment


from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace

class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workflow

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment

class IdeaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Idea



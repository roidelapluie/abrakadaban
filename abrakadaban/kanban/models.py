from django.db import models
from django.utils.translation import ugettext as _
from django.contrib.auth.models import User

class Idea(models.Model):
    title = models.CharField(_("Title"), max_length=64)
    text = models.TextField(_("Text"), blank=True)
    workspace = models.ForeignKey("Workspace")
    subscribers = models.ManyToManyField(User, null=True, related_name='subscribers')
    members = models.ManyToManyField(User, null=True, related_name='members')
    user = models.ForeignKey(User, null=True)
    creation_date = models.DateTimeField(_("Creation date"))
    workflow = models.ForeignKey('Workflow')

    def __unicode__(self):
        return self.title

class Comment(models.Model):
    idea =  models.ForeignKey(Idea)
    user = models.ForeignKey(User, null=True)
    text = models.TextField(_("Text"), blank=True)
    creation_date = models.DateTimeField(_("Creation date"))

    def __unicode__(self):
        return self.text

class Workspace(models.Model):
    title = models.CharField(_("Title"), max_length=64)
    members = models.ManyToManyField(User, null=True)
    workflow = models.ManyToManyField("Workflow")

    def get_title(self):
        return self.title

    def __unicode__(self):
        return self.title

class Workflow(models.Model):
    order = models.IntegerField(_("Order"))
    title = models.CharField(_("Title"), max_length=16)

    def __unicode__(self):
        return '%s - %s' % (str(self.order), self.title)

from fabric.api import *
import os

PATH=os.path.dirname(__file__)

@task
def django(args):
    return local('%s/bin/python %s/abrakadaban/manage.py %s' % (PATH, PATH, args))

@task
def runserver():
    django('runserver')

@task
def syncdb():
    django('syncdb --noinput')
    django('loaddata %s/abrakadaban/kanban/fixtures/superuser.json' % PATH)

@task
def sync_and_run():
    syncdb()
    runserver()

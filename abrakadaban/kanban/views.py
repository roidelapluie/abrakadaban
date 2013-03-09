from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.utils import simplejson


def return_json(data, status=None):
    return HttpResponse(simplejson.dumps(data), content_type="application/json", status=status)


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        json = simplejson.loads(request.body)
        if json['action'] == 'login':
            try:
                username = json['username']
                password = json['password']
            except:
                return return_json({'error': 'You must provide username and password'}, 400)
            user = authenticate(username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return return_json({}, 200)
                else:
                    return return_json({'error': 'User inactive'}, 401)
            else:
                return return_json({'error': 'Bad username or password'}, 401)
        else:
            logout(request)
            return return_json({})

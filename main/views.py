from django.http import JsonResponse
from django.shortcuts import render
import secrets
import json
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET", "POST"])
def password(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            characters = []

            if data.get('uppercase'):
                characters.extend(list('ABCDEFGHIJKLMNOPQRSTUVWXYZ'))
            
            if data.get('lowercase'):
                characters.extend(list('abcdefghijklmnopqrstuvwxyz'))
            
            if data.get('symbols'):
                characters.extend(list('~!@#$%^&*()_+="\/|?><.:;'))

            if data.get('numbers'):
                characters.extend(list('0123456789'))

            if not characters:
                return JsonResponse({'password': 'ERROR: Please select at least one character set.'})

            length = data.get('length', 14)
            if not str(length).isdigit() or int(length) <= 0:
                return JsonResponse({'password': 'ERROR: Invalid length. Please enter a positive number.'})

            length = int(length)
            thepassword = ''.join(secrets.choice(characters) for _ in range(length))
            
            return JsonResponse({'password': thepassword})
        
        except json.JSONDecodeError:
            return JsonResponse({'password': 'ERROR: Invalid JSON data.'})

    elif request.method == "GET":
        return render(request, 'index.html')

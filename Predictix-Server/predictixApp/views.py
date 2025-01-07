from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from .models import Machine

def get_machines(request):
    machines = Machine.objects.all().values()
    return JsonResponse(list(machines), safe=False)

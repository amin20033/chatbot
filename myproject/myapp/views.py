from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import requests
from myapp.models import Chat
from django.contrib.auth.decorators import login_required
import pandas as pd
API_URL = "http://localhost:11434/api/chat"
MODEL_NAME = "phi3"
def ask_ai(prompt, user):
    chats = Chat.objects.filter(user=user)
    messages = []
    for chat in chats:
        messages.append({
            "role": "user",
            "content": chat.message
        })
        messages.append({
            "role": "assistant",
            "content": chat.response
        })
    messages.append({
        "role": "user",
        "content": prompt
    })
    payload = {
        "model": MODEL_NAME,
        "messages": messages,
        "stream": False
    }
    response = requests.post(API_URL, json=payload)
    if response.status_code != 200:
        return f"Error {response.status_code}: {response.text}"
    data = response.json()
    return data["message"]["content"] 

@login_required(login_url="/login/")
def home(request):
    if request.method == "POST":
        prompt = request.POST.get("prompt")
        reply=ask_ai(prompt,request.user)
        chat=Chat(user=request.user,message=prompt,response=reply)
        chat.save()
        return JsonResponse({"reply":reply})
    else:
        chats=Chat.objects.filter(user=request.user)
    return render(request,"home.html",{"chats":chats})

def userLogin(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        if not username or not password:
            return JsonResponse({
                "status": "error",
                "message": "All fields are required"
            })
        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({
                "status": "error",
                "message": "User does not exist. Please signup first."
            })
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({
                "status": "success",
                "message": "Login successful"
            })
        return JsonResponse({
            "status": "error",
            "message": "Incorrect password"
        })
    return render(request, "login.html")

def userLogout(request):
    logout(request)
    return redirect("/login/")

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        cpassword = request.POST.get("cpassword")

        if not username or not password or not cpassword:
            return JsonResponse({
                "status": "error",
                "message": "All fields are mandatory"
            })
        if User.objects.filter(username=username).exists():
            return JsonResponse({
                "status": "error",
                "message": "User already exists. Please login."
            })
        if password != cpassword:
            return JsonResponse({
                "status": "error",
                "message": "Passwords do not match"
            })
        User.objects.create_user(username=username, password=password)
        return JsonResponse({
            "status": "success",
            "message": "User created successfully"
        })
    return render(request, "signup.html")
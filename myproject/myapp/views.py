from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
import requests
from myapp.models import Chat
from django.contrib.auth.decorators import login_required

API_URL = "http://localhost:11434/api/chat"

MODEL_NAME = "phi3"
# or: "mistral"

def ask_ai(prompt):
    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "stream": False
    }

    response = requests.post(API_URL, json=payload)

    if response.status_code != 200:
        return f"Error {response.status_code}: {response.text}"

    data = response.json()
    return data["message"]["content"]
# ========================== 
# Chatbot Home View 
# ========================== 
@login_required(login_url="/login/")
def home(request):
    if request.method == "POST":
        # Get prompt (DO NOT CHANGE THIS PART as requested)
        prompt = request.POST.get("prompt")
        print(prompt)
        reply=ask_ai(prompt)
        chat=Chat(user=request.user,message=prompt,response=reply)
        chat.save()
        return JsonResponse({"reply":reply})
    else:
        chats=Chat.objects.filter(user=request.user)
    return render(request,"home.html",{"chats":chats})
            
           
# ========================== 
# User Authentication Views 
# ========================== 
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
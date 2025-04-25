import { login, logout, register } from "../api/authApi.js";

// Login form
const loginForm = document.getElementById("login-form")
if(loginForm){
    loginForm.addEventListener("submit", (e) => {   
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if(!email || !password){
        alert("Vui lòng nhập email và mật khẩu.");
        return;
    }
    
    login(email, password) 
        .then(() => {
            window.location.href = "/";
        })
        .catch(err => alert(err.message)); 
    });
}

// Register form
const registerForm = document.getElementById("register-form")
if(registerForm){
    registerForm.addEventListener("submit", (e) => {   
    e.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    if(!email || !password || !username){
        alert("Vui lòng nhập thông tin đầy đủ.");
        return;
    }
    
    register(username, email, password)
        .then(() => {
            window.location.href = "/";
        })
        .catch(err => alert(err.message))

    });
}

// Logout button
const logoutButtons = document.querySelectorAll(".logout-btn");
if(logoutButtons){
    for(let i = 0; i < logoutButtons.length; i++){
        logoutButtons[i].addEventListener("click", () => {
            console.log("logout button")
            logout()
                .then(() => {
                    window.location.href = "/login";
                })
        })
    }
}




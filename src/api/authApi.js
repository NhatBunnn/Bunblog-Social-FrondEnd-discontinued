import { API_URL } from "../config/apiConfig.js";
import { getAccessToken } from "./apiUtil.js";

// const API_URL = "http://localhost:8080";


export function login(email, password){
    return fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then(response => response.json())
    .then(dataReponse => {
        if(dataReponse.statusCode >= 200 && dataReponse.statusCode < 300){
            sessionStorage.setItem("access_token", dataReponse.data.accessToken);
        }else{
            throw new Error("Tài khoản hoặc mật khẩu không đúng!");
        }
    })
    .catch(error => {
        throw new Error(error);
    });
}

export function register(username, email, password){
    return fetch(`${API_URL}/auth/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, email, password }),
    })
    .then(response => response.json())
    .then((dataReponse) => {
        if(dataReponse.statusCode >= 200 && dataReponse.statusCode < 300){
            login(email, password);
        }else{
            console.log("lỗi: " + dataReponse.message )
            throw new Error(dataReponse.message);
        }
    })
    .catch(error => {
        throw new Error(error);
    });
}

export function logout(){
    return getAccessToken()
        .then(token => {
            console.log("AccessToken được trả về : " + token)
            return fetch(`${API_URL}/auth/logout`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
        })
        .then(response => {
            if(!response.ok) throw new Error("Đăng xuất thất bại")
            console.log("Đăng xuất thành công")
            sessionStorage.removeItem("access_token");
            return response.json();
        })
        .catch(err => {
            console.error("Đăng xuất thất bại: " + err)
        })

    // if (getAccessToken() === null) return;
    // const accessToken = sessionStorage.getItem('access_token');
    // return fetch(`${API_URL}/auth/logout`, {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //         'Authorization': `Bearer ${accessToken}`
    //     }
    // })
    // .then(response => {
    //     if(!response.ok) throw new Error("Đăng xuất thất bại")
    //     console.log("Đăng xuất thành công")
    //     sessionStorage.removeItem("access_token");
    //     return response.json();
    // })
    // .catch(err => {
    //     console.error("Đăng xuất thất bại: " + err)
    // })
}


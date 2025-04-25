import { API_URL } from "../config/apiConfig.js";

// const API_URL = "http://localhost:8080";

export function getAccessToken(){
    const accessToken = sessionStorage.getItem('access_token');

    if (accessToken) {
        const decodedToken = parseJwt(accessToken);
        const expiresAt = decodedToken?.exp * 1000; // `exp` trong JWT là giây, cần nhân 1000 để đổi thành milliseconds

        if (expiresAt && new Date().getTime() < expiresAt) {
            return Promise.resolve(accessToken);
        }

        return;
    }
    return fetch(`${API_URL}/auth/refreshToken`, {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then(dataReponse => {
        if(dataReponse.data.accessToken){
            sessionStorage.setItem("access_token", dataReponse.data.accessToken);
            return dataReponse.data.accessToken;
        }else{
            throw new Error("Đăng nhập thất bại"); 
        }
    })
    .catch(error => {
        console.error(error);
    });
   
}

export function getRefreshToken(){
    return fetch(`${API_URL}/auth/refreshToken`, {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then(dataReponse => {
        if(dataReponse.data.accessToken){
            console.log("acesstoken thành công")
            sessionStorage.setItem("access_token", dataReponse.data.accessToken);
            console.log("Accesstoken là: " + dataReponse.data.accessToken);
            console.log("RrefreshToken là: " + dataReponse.data.refreshToken);
            return dataReponse.data.accessToken;
        }else{
            throw new Error("Đăng nhập thất bại"); 
        }
    })
    .catch(error => {
        console.error(error);
    });
}


export function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function getCurrentUserName(){
    const accessToken = sessionStorage.getItem('access_token');
    const decodedToken = parseJwt(accessToken)
    return  decodedToken.user.username;
}

export function getCurrentUserId(){
    const accessToken = sessionStorage.getItem('access_token');
    const decodedToken = parseJwt(accessToken)
    return  decodedToken.user.id;
}


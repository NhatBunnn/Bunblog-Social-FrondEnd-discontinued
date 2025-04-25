
import { API_URL } from "../config/apiConfig.js";
import { getAccessToken } from "./apiUtil.js";

export function createUserPage(vainityUrl){
    return getAccessToken()
        .then((accessToken) => {
            return fetch(`${API_URL}/createUserPage`, {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ vainityUrl })

            })
            .then(response => response.json())
            .then((dataReponse) => {
                if(dataReponse.statusCode >= 200 && dataReponse.statusCode < 300){
                    return dataReponse.data;
                }else{
                    throw new Error(dataReponse.message);
                }
            })
        })
}

export function isExitsUserPage(){
    return getAccessToken()
        .then((accessToken) => {
            return fetch(`${API_URL}/isExitsUserPage`, {
                method: "GET",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` 
                },
            })
        .then(response => response.json())
        .then((dataReponse) => {
            if(dataReponse.statusCode >= 200 && dataReponse.statusCode < 300){
                return dataReponse.data;
            }else{
                return null;
            }
        })
    })
}

export function UserPage(vainityUrl){
    return fetch(`${API_URL}/UserPage/${vainityUrl}`, {
        method: "GET",
        credentials: "include"
    })
    .then(response => response.json())
    .then((dataReponse) => {
        if(dataReponse.statusCode >= 200 && dataReponse.statusCode < 300){
            return dataReponse.data;
        }else{
            throw new Error(dataReponse.message);
        }
    })
}

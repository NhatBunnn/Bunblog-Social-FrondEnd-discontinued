import { API_URL } from "../config/apiConfig.js";
import { displayMessageReceiving, displayMessageSending } from "../controller/messageController.js";
import user from "../model/user.js";
import { getAccessToken, getCurrentUserId, getCurrentUserName } from "./apiUtil.js";

export function fetchMessagesByUserId(senderId, receiverId){
    return getAccessToken()
        .then((accessToken) => {
            return fetch(`${API_URL}/fetchAllMessages`, {
                method: "POST",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` 
                },
                body: JSON.stringify({ senderId, receiverId })
            });
        })
        .then(response => response.json())
        .then(dataReponse => {
            if(dataReponse.data.messageReponseDTO){
                dataReponse.data.messageReponseDTO.forEach(e => {
                    const currentUser = new user();
                    if(e.receiver === getCurrentUserId()){
                        currentUser.setId(e.sender);
                        displayMessageReceiving(e.messageContent, currentUser);
                    }else{
                        currentUser.setId(e.receiver);  
                        displayMessageSending(e.messageContent, currentUser);
                    }               
                });
            }
        })   
}


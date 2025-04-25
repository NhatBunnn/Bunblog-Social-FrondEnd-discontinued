
import { parseJwt } from "../api/apiUtil.js";
import { fetchMessagesByUserId } from "../api/chatMessageApi.js";
import { openChatMessages } from "../component/chatMessageUI.js";
import { WEBSOCKET_URL } from "../config/apiConfig.js";

import user from "../model/user.js";

const accessToken = sessionStorage.getItem('access_token');
const socket = new WebSocket(`${WEBSOCKET_URL}/chat?accessToken=${accessToken}`);

socket.onopen = function(event) {
    console.log("Connected to the server.");
    document.getElementById("list-users-card").addEventListener("click", function (e) {
        if (e.target.classList.contains("message-send-btn")) {
            console.log("Đã nhấn nút gửi tin nhắn")

            const receiverId = e.target.getAttribute("data-id");
            const receiverName = e.target.getAttribute("data-username");
            const receiverAvatar = e.target.getAttribute("data-avatar");

            const receiverObject = new user(receiverId, receiverName, receiverAvatar);

            const accessToken = sessionStorage.getItem('access_token');
            const decodedToken = parseJwt(accessToken)
            const senderId = decodedToken.user.id;
            const senderName = decodedToken.user.username;
            
            openChatMessages(receiverObject);
            fetchMessagesByUserId(senderId, receiverId)
        }
    })

};

// Xử lý khi nhận tin nhắn từ server
socket.onmessage = function(event) {
    let data = JSON.parse(event.data);
    const senderObject = new user(data.id, null, null);
    displayMessageReceiving(data.messageContent, senderObject);
};

// Xử lý khi kết nối đóng
socket.onclose = function(event) {
    console.log("Connection closed.");
};

// Xử lý lỗi kết nối
socket.onerror = function(error) {
    console.log("WebSocket Error: " + error.message);
};

export function sendMessageToUser(receiverObject) {
    const messageBox = document.querySelector(`.message-box[data-username='${receiverObject.getUsername()}']`);
    if (!messageBox) return;

    //Get sender
    const accessToken = sessionStorage.getItem('access_token');
    const decodedToken = parseJwt(accessToken)
    const senderId = decodedToken.user.id;
    const senderName = decodedToken.user.username;

    //Get message
    let messageContent = messageBox.querySelector("#message-input")

    const message = {
        sender_id: senderId,
        receiver_id: receiverObject.getId(),
        message_content: messageContent.value
    }

    console.log(JSON.stringify(message))
    socket.send(JSON.stringify(message));
    
    displayMessageSending(messageContent.value, receiverObject)
    messageContent.value = "";
}


export function displayMessageSending(message, receiverObject) {
    //Get sender
    const accessToken = sessionStorage.getItem('access_token');
    const decodedToken = parseJwt(accessToken)
    const senderId = decodedToken.user.id;
    const SenderName = decodedToken.user.username;

    const messageBox = document.querySelector(`.message-box[data-id='${receiverObject.getId()}']`);
    if (!messageBox) return; 

    const messageList = messageBox.querySelector(".message-list");   
    const messageContent = document.createElement("li");
    messageContent.classList.add("message-content", "d-flex", "justify-content-end", "align-items-center");
    messageContent.innerHTML = `
        <p class="message-text my-0">${message}</p>
    `;
    messageList.appendChild(messageContent);
    scrollToBottom(messageBox)
}


export function displayMessageReceiving(message, senderObject) {
    //Get receiver
    const accessToken = sessionStorage.getItem('access_token');
    const decodedToken = parseJwt(accessToken)
    const receiverId = decodedToken.user.id;
    const receiverName = decodedToken.user.username;

    const messageBox = document.querySelector(`.message-box[data-id='${senderObject.getId()}']`);
    if (!messageBox) return;

    const messageList = messageBox.querySelector(".message-list");   
    const messageContent = document.createElement("li");
    messageContent.classList.add("message-content", "d-flex", "align-items-center");
    messageContent.innerHTML = `
        <img src="${messageBox.dataset.avatar}" alt="" class="avatar">
        <p class="message-text my-0">${message}</p>
    `;
    messageList.appendChild(messageContent);
    scrollToBottom(messageBox);
}

export function scrollToBottom(messageBox) {
    const messageArea = messageBox.querySelector(".message-area");
    messageArea.scrollTop = messageArea.scrollHeight;
}

import { sendMessageToUser } from "../controller/messageController.js";

let listMessageBox = [];
export function openChatMessages(receiverObject){  

    const maxChatBox = 3;
    if(listMessageBox.length >= maxChatBox){
        const removedMessageBox = listMessageBox.shift();
        const messageBoxElement = document.querySelector(`.message-box[data-id='${removedMessageBox}']`);
    }

    const isExits = listMessageBox.some(n => n === receiverObject.getId());
    if(isExits){
        return  
    }
    
    const messageContainer = document.getElementById("message");
    const messageBox = document.createElement("li");
    messageBox.id = "message-box";
    messageBox.classList.add("message-box");
    messageBox.dataset.id = `${receiverObject.getId()}`;
    messageBox.dataset.username = `${receiverObject.getUsername()}`;
    messageBox.dataset.avatar = `${receiverObject.getAvatar()}`;
    messageBox.innerHTML = `
        <div class="message-header d-flex align-items-center">
            <img src="${receiverObject.getAvatar()}" alt="" class="avatar">
            <div class="message-info">
                <div class="author">${receiverObject.getUsername()}</div>
                <div class="time-active fontSize-13px">Hoạt động 7 phút trước</div>
            </div>
            <i class="message-close fa-solid fa-xmark flex-item-right"></i>
        </div> 
        <div class="message-area">
            <ul class="message-list px-0">
            </ul>
        </div>
        <form class="message-input">
            <input type="text" id="message-input" placeholder="Nhập tin nhắn...">
            <button class="message-send-btn btn btn-primary">Gửi</button>
        </form> 
    `
    messageContainer.appendChild(messageBox);
    listMessageBox.push(receiverObject.getId());

    const closeMessage = messageBox.querySelector(".message-close");
    closeMessage.addEventListener("click", () => {
        closeChatMessages(receiverObject.getId());
    })

    const messasgeInput = messageBox.querySelector(".message-input").addEventListener("submit", (e) => {
        e.preventDefault();
        sendMessageToUser(receiverObject , messageBox);
    })
}

export function closeChatMessages(receiverId){
    const messageBox = document.querySelector(`.message-box[data-id='${receiverId}']`);
    if(messageBox){
        messageBox.remove();
    }
    listMessageBox = listMessageBox.filter(n => n !== receiverId);
}









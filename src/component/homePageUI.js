export function renderUser(user) {
    const userList = document.getElementById("current-user");
    userList.innerHTML = `
        <div style="
        margin-bottom: 18px;
            background-color: #ffffff; 
            padding: 20px; 
            border-radius: 12px; 
            box-shadow: 0 4px 15px rgba(0,0,0,0.1); 
            text-align: center; 
            color: #718096; 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6;">
            <h2 style="
                color: #2c5282; 
                font-size: 1.8em; 
                font-weight: 600; 
                margin: 0 0 10px 0; 
                text-transform: uppercase; 
                letter-spacing: 1px;">
                Xin chào: 
                <span style="color: #38a169; font-weight: 700;">${user.username}</span>
            </h2>
            <p style="
                font-size: 1.1em; 
                margin: 0; 
                color: #718096;">
                Đã đăng nhập với email: 
                <span style="
                    background-color: #f4f7fa; 
                    padding: 4px 10px; 
                    border-radius: 8px; 
                    color: #2c5282; 
                    font-weight: 600;">
                    ${user.email}
                </span>
            </p>

            <img id="preview" src="${user.avatar}" alt="Uploaded image will appear here" />

        </div>
    `;
}

export function renderListUsers(user){
    const listUsers = document.getElementById("list-users-card");

    user.forEach(element => {
        listUsers.innerHTML += `
           <li class="user-card borderRadius-10px d-flex align-items-center">
            <img src="${element.avatar}" alt="" class="avatar">
            <div class="info">
                <div class="author">
                    ${element.username}
                </div>
                <div class="sub-info">
                    <div class="subscribe">
                        1000 người theo dõi
                    </div>
                    <div class="status">
                        Online
                    </div>
                </div>
            </div>
            <div class="status-message mx-auto d-flex align-items-center">
                <span>💬</span>
                <div class="">Bruh bruh lmao...</div>
            </div>
            <div class="explore-btn">
                <div class="btn btn-success borderRadius-10px">
                    Khám phá ngay 
                </div>
            </div>
            <div class="texting-btn" id="texting-btn">
                <button data-avatar="${element.avatar}" data-id="${element.id}" data-username="${element.username}" class="message-send-btn btn btn-primary">Nhắn tin</button>    
            </div>
        </li>  `
    });

   
}
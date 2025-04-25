import { updateUser } from "../api/settingApi.js";

const accountForm = document.querySelector("#setting-account-form");
const avatarPreview = document.querySelector("#setting-account-avatarPreview");
if(accountForm){
    accountForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const username = accountForm.querySelector("#setting-account-username").value; 
        const address = accountForm.querySelector("#setting-account-address").value;   
        const fileInput = document.querySelector("#setting-account-avatar");
        const avatar = fileInput.files.length > 0 ? fileInput.files[0] : null;
        avatarPreview.src = URL.createObjectURL(avatar);

        updateUser(username, address, avatar)
    })
}

document.getElementById('setting-account-avatar').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const preview = document.getElementById('setting-account-avatarPreview');
        preview.src = URL.createObjectURL(file);
    }
});

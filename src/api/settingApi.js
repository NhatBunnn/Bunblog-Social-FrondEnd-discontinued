import { API_URL } from "../config/apiConfig.js";
import { getAccessToken } from "./apiUtil.js";


export function updateUser(username, address, avatar) {
    return getAccessToken()
        .then((accessToken) => {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("address", address);
            
            if(avatar) {
                formData.append("avatar", avatar);
            }

            return fetch(`${API_URL}/updateUser`, {         
                method: "POST",
                credentials: "include",
                headers: { 
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData
            });
        })
        .then(response => response.json())
        .then((dataResponse) => {
            if (dataResponse.statusCode >= 200 && dataResponse.statusCode < 300) {
                sessionStorage.setItem("access_token", dataResponse.data.accessToken);
                console.log("Cập nhật thành công")
                console.log(dataResponse.data.userDTO)
            }else{
                console.log("Cập nhật không thành công")
            }
        })
}
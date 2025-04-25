
import { API_URL } from "../config/apiConfig.js";
import { getAccessToken } from "./apiUtil.js";

export function fetchAllUsers(){
    console.log("Đang gọi API lấy tất cả người dùng")
    return getAccessToken()
        .then((accessToken) => {
            return fetch(`${API_URL}/fetchAllUsers`, {
                method: "GET",
                credentials: "include",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}` // Truyền token vào header
                }
            })
            .then(response => response.json())
            .then((dataReponse) => {
                if(dataReponse.data){
                    dataReponse.data.forEach(user => {
                        console.log("in ra: " + user.email + " - " + user.username) 
                    });
                    return dataReponse.data
                }else{
        
                }
            })
            .catch((err) => {
                console.log("Lỗi: " + err)
            })
        })

}
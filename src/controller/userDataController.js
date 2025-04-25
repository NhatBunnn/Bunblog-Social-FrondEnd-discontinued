import { getAccessToken, parseJwt } from "../api/apiUtil.js";
import { API_URL } from "../config/apiConfig.js";


const avatar = document.querySelector(".account .avatar img");
getAccessToken()
    .then((accessToken) => {
        const currentUser = parseJwt(accessToken); 
        avatar.src = currentUser.user.avatar;
    })
    .catch((error) => {
        console.error("Error fetching access token:", error);
    })
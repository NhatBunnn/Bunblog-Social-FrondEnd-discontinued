import { API_URL } from "../config/apiConfig.js";
import { getAccessToken, getRefreshToken } from "./apiUtil.js";


export function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);

    return getAccessToken()
        .then(token => {
            return fetch(`${API_URL}/api/upload`, {
                method: "POST",
                credentials: "include",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });
        })
        .then(response => {
            // sessionStorage.setItem("access_token", response.data.accessToken);
            if (!response.ok) {
                throw new Error("Upload failed");
            }
            return response.text();
        })
        .then(url => {
            console.log("Image uploaded:", url);
            document.getElementById("preview").src = url;
        })
        .catch(error => {
            console.error("Upload failed:", error);
            alert("Upload failed. See console for details.");
        });
}


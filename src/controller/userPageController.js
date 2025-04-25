import { UserPage } from "../api/userPageApi.js";

const vainityUrl = document.getElementById("userPage-data").dataset.username;
if(vainityUrl){
    UserPage(vainityUrl)
        .then((dataReponse) => {
            console.log("user page " + dataReponse.vainityUrl)
        })
        .catch(err => {
            console.log(err.message)
        })
}
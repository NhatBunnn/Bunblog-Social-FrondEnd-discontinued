import { getAccessToken, parseJwt } from "../api/apiUtil.js";
import { fetchAllUsers } from "../api/userApi.js";
import { renderListUsers, renderUser } from "../component/homePageUI.js";
import { createUserPage, isExitsUserPage } from "../api/userPageApi.js";

const createPageModel = document.querySelector(".create-page-model");
document.querySelector(".slider .expose-btn").addEventListener("click", (e) =>{
    e.preventDefault();
    isExitsUserPage()
        .then((dataReponse) => {
            if(dataReponse){
                window.location.href = `/${dataReponse.vainityUrl}`;
            }else{
                createPageModel.classList.add("d-flex");
                const createForm = document.querySelector(".create-page-form")
                if(createForm){
                    createForm.addEventListener("submit", (e) => {
                        e.preventDefault();
                        const VainityUrl = document.querySelector("#vainity-url input").value;
                        createUserPage(VainityUrl)
                            .then((dataReponse) => {
                                window.location.href = `/${dataReponse.vainityUrl}`;
                            })
                            .catch(err => {
                                console.log(err.message)
                            });
                    })
                }
            }
        })
        .catch(err => {
            console.log(err.message)
        })
})

//Fix bug: chỉ thêm được "access token" sau khi f5 1 lần nữa
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header")
    const toggleButton = document.querySelector(".header .toggle")
    header.style.transform = 'translateY(0)';
    toggleButton.style.transform = 'rotate(180deg)'
    let currentUser = "";

    return getAccessToken() 
        .then((accessToken) => {
            const currentUser = parseJwt(accessToken).user;
            renderUser(currentUser);
            return Promise.all([Promise.resolve(currentUser), fetchAllUsers()]); 
        })
        .then(([currentUser, users]) => {
            let usersExceptMe = []
            console.log("Người dùng hiện tại:")
            console.log(currentUser)
            console.log(currentUser.avatar)
            console.log(currentUser.username)

            users.forEach(user => {
                if(user.email != currentUser.email){
                    usersExceptMe.push(user);
                }
            });
            renderListUsers(usersExceptMe);

            const login = document.querySelector(".header .login")
            const logout = document.querySelector(".header .logout")

            logout.style.display = 'block'
            login.style.display = 'none'

        })
        .then(() => {
            console.log("Fetched all users successfully.");
        })
        .catch((error) => {
            console.error("Error loading data:", error);
        });
});


  

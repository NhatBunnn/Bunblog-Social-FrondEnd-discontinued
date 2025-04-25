import { uploadImage } from "../api/uploadImageApi.js";


document.getElementById("uploadForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    uploadImage(file);
});
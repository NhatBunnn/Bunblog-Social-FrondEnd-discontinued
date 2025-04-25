const header = document.querySelector(".header")
const toggleButton = document.querySelector(".header .toggle")

let isMoved = false;
document.querySelector(".header .toggle").addEventListener("click", (e) =>{
    console.log("da bam")
    if(!isMoved){
        header.style.transform = 'translateY(0)';
        toggleButton.style.transform = 'rotate(180deg)'
    }else{
        header.style.transform ='translateY(-78px)'
        toggleButton.style.transform = 'rotate(0deg)'

    }
    isMoved = !isMoved;
})

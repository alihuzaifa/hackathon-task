// ======================================  Firebase  ===================================== 
import { auth } from ".././firebase/firebase-config.js"
import {
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

// ======================================  All variables  ===================================== 

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#login");
const loader = document.querySelector(".login-btn-changer");
const mainError = document.querySelector(".main-error");

// ======================================  Main Function  =====================================
const loginData = async () => {
    if (email.value !== "" || password.value !== "") {
        try {
            loader.innerHTML = `<div class="loader"></div>`;
            let user = await signInWithEmailAndPassword(auth, email.value, password.value)
            localStorage.setItem("admin",password.value);
            loader.innerHTML = "LOGIN"
            location = ".././admin.html"
            mainError.classList.add("error");
            mainError.style.display = "block"; 
        }
        catch (error) {
            if (error.message === `Firebase: Error (auth/user-not-found).`) {
                mainError.innerHTML = "You don't have any account."
                mainError.classList.add("error");
                mainError.style.display = "block";
                childClearError()
            } else if (error.message === `Firebase: Error (auth/wrong-password).`) {
                mainError.innerHTML = `Wrong Password.`
                mainError.classList.add("error");
                mainError.style.display = "block";
                childClearError()
            }
        }
    } else {
        mainError.innerHTML = "Please Fill All Input Fields."
        mainError.classList.add("error");
        mainError.style.display = "block";
        childClearError()
    }

}
login.addEventListener("click", loginData);

// ======================================  Clear All error after 4 seconds  =====================================
function clearAllError() {
    mainError.innerHTML = "";
    mainError.style.display = "none";
}
function childClearError() {
    setTimeout(clearAllError, 4000);
}
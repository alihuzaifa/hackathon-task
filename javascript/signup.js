// ==================================  Firebase config  ========================================
import {
    auth,
    db,
    storage
} from "../firebase/firebase-config.js";

import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

import {
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

import {
    uploadBytes,
    getDownloadURL,
    ref
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";


// // ==================================  All Variables  ========================================
const userName = document.querySelector(".name");
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const confirmPassword = document.querySelector(".confirm-password");
const gender1 = document.querySelector(".male");
const gender2 = document.querySelector(".female");
const gender3 = document.querySelector(".other");
const country = document.querySelector(".country");
const city = document.querySelector(".city");
const category = document.querySelector(".user-category");
const img = document.querySelector(".file");
const loader = document.querySelector(".button-changer");
let direction = false;

// // ==================================  All Variables For Error  ========================================
const nameError = document.querySelector(".name-error");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const confirmPasswordError = document.querySelector(".confirm-pass-error");
const genderError = document.querySelector(".gender-error");
const countryError = document.querySelector(".country-error");
const cityError = document.querySelector(".city-error");
const mainError = document.querySelector(".main-error");

// // ==================================  Email Regex Checker  ========================================
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

// // ==================================  For Checking  ========================================
let correct = 0;

// // ==================================  Main Function Variable  ========================================
const signup = document.querySelector(".signup");

// ======================================  You have to define it first to check user is log in or not  ===================================== 
onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        // console.log(user)
    } else {
        // console.log("User is signed out")
    }
});

// ==================================  Main Function ========================================
const signupData = async () => {

    // ======================================  Name Checker  ===================================== 
    if (userName.value !== "") {
        if (userName.value.length > 2) {
            correct++
        } else {
            nameError.innerHTML = "Please enter a valid Name";
            nameError.classList.add("error");
            nameError.style.display = "block"
            childClearError();
            removeEmail();
            correct = 0;
            return false
        }

    } else {
        mainError.innerHTML = "ALL INPUT FIELDS ARE REQUIRED";
        mainError.classList.add("error");
        mainError.style.display = "block"
        childClearError();
        removeEmail();
        correct = 0;
        return false
    }

    // ======================================  Email Checker  ===================================== 
    if (email.value !== "") {
        if (emailRegex.test(email.value)) {
            correct++
        } else {
            emailError.innerHTML = "Please enter a valid email"
            emailError.classList.add("error");
            emailError.style.display = "block";
            childClearError();
            removeEmail();
            correct = 0;
            return false;
        }

    } else {
        mainError.innerHTML = "ALL INPUT FIELDS ARE REQUIRED"
        mainError.classList.add("error");
        mainError.style.display = "block";
        childClearError();
        removeEmail();
        correct = 0;
        return false
    }

    // ======================================  Password Checker  ===================================== 
    if (password.value !== "") {
        if (password.value.length > 7) {
            correct++
        } else {
            passwordError.innerHTML = "Password contain minimum 8 characters";
            passwordError.classList.add("error");
            passwordError.style.display = "block"
            childClearError();
            removeEmail();
            correct = 0;
            return false
        }

    } else {
        mainError.innerHTML = "ALL INPUT FIELDS ARE REQUIRED"
        mainError.classList.add("error");
        mainError.style.display = "block";
        childClearError();
        removeEmail();
        correct = 0;
        return false;
    }

    // ======================================  Confirm Password Checker  ===================================== 
    if (confirmPassword.value !== ``) {
        if (confirmPassword.value === password.value) {
            correct++
        } else {
            confirmPasswordError.innerHTML = "Please Enter a matched password"
            confirmPasswordError.classList.add("error");
            confirmPasswordError.style.display = "block";
            childClearError();
            removeEmail();
            correct = 0;
            return false
        }
    }
    else {
        mainError.innerHTML = "ALL INPUT FIELDS ARE REQUIRED";
        mainError.classList.add("error");
        mainError.style.display = "block";
        childClearError();
        removeEmail()
        correct = 0;
        return false
    }

    // ======================================  Selected Gender Checker  ===================================== 
    if (gender1.checked !== false || gender2.checked !== false || gender3.checked !== false) {
        correct++
    } else {
        genderError.innerHTML = "Please Select Your Gender.";
        genderError.classList.add("error");
        genderError.style.display = "block";
        childClearError();
        removeEmail()
        correct = 0;
        return false
    }

    // ======================================  Selected Country Checker  =====================================
    if (country.value !== "Enter Country") {
        correct++
    } else {
        countryError.innerHTML = "Select Your Country.";
        countryError.classList.add("error");
        countryError.style.display = "block";
        removeEmail()
        childClearError();
        correct = 0;
        return false
    }



    // ======================================  Selected City Checker  =====================================
    if (city.value !== "Enter City") {
        correct++
    } else {
        cityError.innerHTML = "Select Your City.";
        cityError.classList.add("error");
        cityError.style.display = "block";
        removeEmail()
        childClearError();
        correct = 0;
        return false
    }


    // ======================================  Selected City Checker  =====================================
    if (category.value === "Enter Category" || category.value === "Buyer") {
        direction = true;
    }


    // ======================================  File Checker  ===================================== 
    if (img.files !== ``) {
        correct++
    }
    else {
        mainError.innerHTML = "ALL INPUT FIELDS ARE REQUIRED";
        mainError.classList.add("error");
        mainError.style.display = "block";
        removeEmail();
        childClearError();
        return false
    }

    if (correct >= 8) {
        loader.innerHTML = `<div class="loader"></div>`
        let upload_picture = img.files[0];
        try {

            // ======================================  Firebase Authentication  ===================================== 
            await createUserWithEmailAndPassword(auth, email.value, password.value);

            // ======================================  Firebase Storage  ===================================== 
            const imageRef = await ref(storage, `user-images/${auth.currentUser.uid},${upload_picture.name}`);
            await uploadBytes(imageRef, upload_picture);
            const url = await getDownloadURL(imageRef);
            console.log(imageRef)

            // ======================================  Firebase Firestore  ===================================== 
            const dataRef = collection(db, "allUsers");
            await addDoc(dataRef, {
                userName: userName.value,
                userEmail: email.value,
                uid: auth.currentUser.uid,
                country : country.value,
                image: url
            });

            // ======================================  Send Email For Verify  ===================================== 
            await sendEmailVerification(auth.currentUser);

            // ======================================  Change Location  =====================================
            if (direction) {
                localStorage.setItem("user-category", JSON.stringify("Buyer"))
            } else {
                localStorage.setItem("user-category", JSON.stringify("Seller"))
            }

            loader.innerHTML = `SIGN UP`;
            location = "../verification.html";
            clearAllInput();
        }
        catch (error) {
            if (error.message == "Firebase: Error (auth/email-already-in-use).") {
                mainError.innerHTML = "Email Already In Use. Please Enter Another email."
                mainError.classList.add("error");
                mainError.style.display = "block";
                childClearError();
                return false;
            }
        }
    }
}

signup.addEventListener("click", signupData);

// ======================================  Clear All input after data is confirm  =====================================
function clearAllInput() {
    userName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    gender1.checked = false;
    gender2.checked = false;
    gender3.checked = false;
    country.value = "";
    city.value = "";
    img.files = "";
}

// ======================================  Clear All error after 4 seconds  =====================================
function clearAllError() {

    // For clearing InnerHtml
    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    confirmPasswordError.innerHTML = "";
    countryError.innerHTML = "";
    cityError.innerHTML = "";
    genderError.innerHTML = "";
    mainError.innerHTML = "";

    // For By Default display none
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    confirmPasswordError.style.display = "none";
    countryError.style.display = "none";
    cityError.style.display = "none";
    genderError.style.display = "none";
    mainError.style.display = "none";

}

function childClearError() {
    setTimeout(clearAllError, 4000);
};

function removeEmail() {
    email.value = "";
}
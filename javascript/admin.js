// ==================================  Firebase config  ========================================
import {
    auth,
    db,
    storage
} from "../firebase/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js";

import {
    collection,
    addDoc,
    onSnapshot,
    query,
    where
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

import {
    uploadBytes,
    getDownloadURL,
    ref
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";

// ==================================  All Variables  ========================================
// ==================================  All Variables Of Classes ========================================
const addClass = document.querySelector("#add-class");
const classTiming = document.querySelector(".class-timing");
const classSchedule = document.querySelector(".class-schedule");
const teachersName = document.querySelector(".teachers-name");
const sectionName = document.querySelector(".section-timing");
const courseName = document.querySelector(".course-name");
const batchNumber = document.querySelector(".batch-number");
const mainError = document.querySelector(".main-error");
const dropdownList = document.querySelector("#dropdown-menu");
const attendancePage = document.querySelector(".attendance-page");
let unsubscribe;

// ==================================  All Variables Of Students ========================================
const studentName = document.querySelector(".name");
const fatherName = document.querySelector(".f-name");
const rollNumber = document.querySelector(".roll-number");
const contactNumber = document.querySelector(".contact-number");
const cnicNumber = document.querySelector(".cnic-number");
const studentPic = document.querySelector(".student-pic")
const courseNameStudent = document.querySelector(".student-course-name");
const teachersList = document.querySelector(".teachers-list");
const addStudent = document.querySelector("#add-student");
const studentsMainError = document.querySelector(".student-error");
const dropdown = document.querySelector(".dropdown");
const logout = document.querySelector(".logout")

// ==================================  For Make Class  ========================================
const addClassData = async () => {
    if (classTiming.value === "Open this select timings" || classSchedule.value === "Open this select classes" || teachersName.value === "Open this select teacher's name" || sectionName.value === "Open this select class timings" || batchNumber.value === "Open this select batch name" || courseName.value === "Open this select course name") {
        mainError.innerHTML = "All Input Data Are Required"
        mainError.classList.add("error");
        mainError.style.display = "block"
    }
    else {
        addClass.innerHTML = `<div class="loader"></div>`
        let collectionRef = collection(db, "all-classes")
        const docRef = await addDoc(collectionRef, {
            timing: classTiming.value,
            schedule: classSchedule.value,
            teachers: teachersName.value,
            section: sectionName.value,
            course: courseName.value,
            batch: batchNumber.value
        });
        localStorage.setItem("timing", JSON.stringify(classTiming.value));
        mainError.innerHTML = "The Class Has Been Made"
        mainError.classList.add("error");
        mainError.style.display = "block"
        addClass.innerHTML = `Add`
        clearInputFields()

    }
}
addClass.addEventListener("click", addClassData);

function clearInputFields() {
    classTiming.value = "Open this select timings";
    classSchedule.value = "Open this select classes";
    teachersName.value = "Open this select teacher's name";
    sectionName.value = "Open this select class timings";
    batchNumber.value = "Open this select batch name";
    courseName.value = "Open this select course name"
}

// ==================================  For Students Data  ========================================
const studentData = async () => {
    if (studentName.value === "" || fatherName.value === "" || rollNumber.value === "" || contactNumber.value === "" || cnicNumber.value === "" || courseNameStudent.value === "" || teachersList.value === "") {
        studentsMainError.innerHTML = "All Input Fields Are Required"
        studentsMainError.classList.add("error");
        studentsMainError.style.display = "block"
    } else {
        addStudent.innerHTML = `<div class="loader"></div>`;
        let upload_picture = studentPic.files[0];
        const imageRef = await ref(storage, `user-images/${upload_picture.name}`);
        await uploadBytes(imageRef, upload_picture);
        const url = await getDownloadURL(imageRef);

        // ======================================  Firebase Firestore  ===================================== 
        const dataRef = collection(db, "allUsers");
        let data = await addDoc(dataRef, {
            student: studentName.value,
            studentFather: fatherName.value,
            rollNumberStudent: rollNumber.value,
            uid: auth.currentUser.uid,
            contact: contactNumber.value,
            cnic: cnicNumber.value,
            studentCourse: courseNameStudent.value,
            teacher: teachersList.value,
            image: url,
        });
        addStudent.innerHTML = "Add Student"
        clearInput()
    }

}
addStudent.addEventListener("click", studentData)

function clearInput() {
    studentName.value == "";
    fatherName.value === "";
    rollNumber.value === "";
    contactNumber.value === "";
    cnicNumber.value === "";
}
const logoutProfile = async () => {
    signOut(auth).then(() => {
        location = "../index.html"
    }).catch((error) => {
        // An error happened.
    });

}
logout.addEventListener("click", logoutProfile)

function getCourseName() {

    const q = query(collection(db, "allUsers"));
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        dropdownList.innerHTML = "";
        querySnapshot.forEach((doc) => {
            let data = doc.data().studentCourse
            dropdownList.innerHTML += `<option>${data}</option>`

        });
    });
}


window.getCourseName = getCourseName;
// ==================================  Firebase config  ========================================
import {
    auth,
    db,
} from "../firebase/firebase-config.js";

import {
    collection,
    updateDoc,
    onSnapshot,
    query,
    doc,
    where
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

// All Variables
// const studentName = document.querySelector(".name");
// const fatherName = document.querySelector(".f-name");
// const rollNumber = document.querySelector(".roll-number");
// const contactNumber = document.querySelector(".contact");
// const cnicNumber = document.querySelector(".cnic");
// const studentPic = document.querySelector(".student-pic");
// const teacher = document.querySelector(".teacher");
const searchValue = document.querySelector(".search-value");
const searchBtn = document.querySelector(".search-data");
// const attendance = document.querySelector(".Attendance");
// const attendanceValue = document.querySelector(".attendance-selection")
const cardData = document.querySelector(".card-data")
let unsubscribe;



function checkData() {
    const q = query(collection(db, "allUsers"), where("rollNumberStudent", "==", searchValue.value));
    searchBtn.innerHTML = `<div class="loader"></div>`
    unsubscribe = onSnapshot(q, (querySnapshot) => {
        cardData.innerHTML = "";
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            let timing = localStorage.getItem("timing");
            timing = JSON.parse(timing);
            console.log(data)
            cardData.innerHTML = `<div class="col-6 offset-3">
            <div class="card">
                <div class="row">
                    <div class="col">
                        <img src="${data.image}" class="card-img-top student-pic" alt="user-img">
                        <div class="card-body">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col">
                                        <h5>Name: <span class="h5">${data.student}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>Roll Number: <span class="h5">${data.rollNumberStudent}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>Father: <span class="h5">${data.studentFather}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>Contact : <span class="h5 contact">${data.contact}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>Teacher: <span class="h5 ">${data.teacher}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>Timing: <span class="h5 ">${timing}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <h5>CNIC: <span class="h5 cnic">${data.cnic}</span></h5>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <button type="button" class="btn btn-outline-dark" onclick ="attendance()">Attendance</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
        });
    });
    searchBtn.innerHTML = `Search`;
}
function attendance(){
    let date = new Date();
    let currentHours = date.getHours();
    let data = localStorage.getItem("timing");
    let studentStatus;
    data = JSON.parse(data);
    if(data > currentHours){
        studentStatus = "absent"
    }else{
        studentStatus = "present"
    }
    
}
window.checkData = checkData;
window.attendance = attendance
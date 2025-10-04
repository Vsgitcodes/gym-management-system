import { auth, db } from "./firebase-config.js";
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

// Reference to member info div and download button
const infoDiv = document.getElementById("memberInfo");
const downloadBtn = document.getElementById("downloadBtn");

let memberData = null; // store member data for PDF

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(collection(db, "members"), where("email", "==", user.email));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      memberData = snapshot.docs[0].data(); // store data
      infoDiv.innerHTML = `
        <h3>Welcome, ${memberData.name}</h3>
        <p><b>Email:</b> ${memberData.email}</p>
        <p><b>Monthly Fee:</b> ₹${memberData.fee}</p>
        <p><b>Join Date:</b> ${memberData.joinDate}</p>
        <p><b>Gender:</b> ${memberData.gender}</p>
        <p><b>Plan:</b> ${memberData.plan}</p>
        <p><b>Diet Details:</b> ${memberData.diet}</p>
      `;
    } else {
      infoDiv.innerHTML = `<p>No record found for your account.</p>`;
    }
  } else {
    window.location.href = "index.html";
  }
});

// 🔹 Download PDF Receipt
downloadBtn.addEventListener("click", () => {
  if (!memberData) return alert("Member data not loaded yet!");

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Gym Membership Receipt", 20, 20);

  doc.setFontSize(12);
  doc.text(`Name: ${memberData.name}`, 20, 40);
  doc.text(`Email: ${memberData.email}`, 20, 50);
  doc.text(`Fee: ₹${memberData.fee}`, 20, 60);
  doc.text(`Join Date: ${memberData.joinDate}`, 20, 70);
  doc.text(`Gender: ${memberData.gender}`, 20, 80);
  doc.text(`Plan: ${memberData.plan}`, 20, 90);
  doc.text(`Diet Details: ${memberData.diet}`, 20, 100);

  doc.save(`${memberData.name}_Receipt.pdf`);
});

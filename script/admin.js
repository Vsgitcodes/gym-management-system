import { db } from "./firebase-config.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

const addMemberBtn = document.getElementById("addMemberBtn");
const tableBody = document.querySelector("#memberTable tbody");
const membersRef = collection(db, "members");

// 🔹 Add Member
addMemberBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const fee = document.getElementById("fee").value;
  const joinDate = document.getElementById("joinDate").value;
  const gender = document.getElementById("gender").value;
  const plan = document.getElementById("plan").value;
  const diet = document.getElementById("diet").value;

  if (!name || !email || !fee || !joinDate || !gender || !plan || !diet) {
    alert("Please fill all fields");
    return;
  }

  await addDoc(membersRef, { name, email, fee, joinDate, gender, plan, diet });
  alert("Member added successfully!");
  window.location.reload();
});

// 🔹 Display Members
async function loadMembers() {
  const snapshot = await getDocs(membersRef);
  tableBody.innerHTML = "";
  snapshot.forEach((docSnap) => {
  const data = docSnap.data();
  const row = `
    <tr>
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>₹${data.fee}</td>
      <td>${data.joinDate}</td>
      <td>${data.gender}</td>
      <td>${data.plan}</td>
      <td>${data.diet}</td>
      <td><button onclick="deleteMember('${docSnap.id}')">Delete</button></td>
    </tr>`;
  tableBody.innerHTML += row;
});
}
loadMembers();

// 🔹 Delete Member
window.deleteMember = async (id) => {
  await deleteDoc(doc(db, "members", id));
  alert("Member deleted!");
  window.location.reload();
};

import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const errorMsg = document.getElementById("errorMsg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    errorMsg.textContent = "Please enter email and password";
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Role-based redirect
    if (email === "admin@gmail.com") {
      window.location.href = "admin.html";   // Admin dashboard
    } else {
      window.location.href = "member.html";  // Member dashboard
    }
  } catch (error) {
    console.error(error);
    errorMsg.textContent = "Invalid email or password!";
  }
});

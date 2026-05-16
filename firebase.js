import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyAz6H-iSZZYpVqboRQ6C_Yu44AAxXC8VNU",

  authDomain:
  "leetcode-progress-tracke-a5e6c.firebaseapp.com",

  projectId:
  "leetcode-progress-tracke-a5e6c",

  storageBucket:
  "leetcode-progress-tracke-a5e6c.firebasestorage.app",

  messagingSenderId:
  "482877156239",

  appId:
  "1:482877156239:web:e6237c02b02efcb9ebb9fa",

  measurementId:
  "G-PD02FLQZ99"
};

const app =
  initializeApp(firebaseConfig);

const auth =
  getAuth(app);

const googleProvider =
  new GoogleAuthProvider();

const githubProvider =
  new GithubAuthProvider();


// GOOGLE LOGIN

document.querySelector(".google-btn")
.addEventListener("click", async () => {

  try {

    const result =
      await signInWithPopup(
        auth,
        googleProvider
      );

    const user =
      result.user;

    localStorage.setItem(
      "loggedInUser",
      user.displayName
    );

    window.location.href =
      "dashboard.html";

  } catch (error) {

    alert(error.message);
  }
});


// GITHUB LOGIN

document.querySelector(".github-btn")
.addEventListener("click", async () => {

  try {

    const result =
      await signInWithPopup(
        auth,
        githubProvider
      );

    const user =
      result.user;

    localStorage.setItem(
      "loggedInUser",
      user.displayName
    );

    window.location.href =
      "dashboard.html";

  } catch (error) {

    alert(error.message);
  }
});

let isLogin = true;

const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const toggleText = document.getElementById("toggleText");

const authForm = document.getElementById("authForm");

// TOGGLE LOGIN ↔ SIGNUP
function renderToggle() {

  if (isLogin) {
    formTitle.innerText = "Login";
    submitBtn.innerText = "Login";

    toggleText.innerHTML =
      `Don't have account?
      <a href="#" id="toggleLink">Signup</a>`;
  } else {
    formTitle.innerText = "Signup";
    submitBtn.innerText = "Signup";

    toggleText.innerHTML =
      `Already have account?
      <a href="#" id="toggleLink">Login</a>`;
  }

  document.getElementById("toggleLink")
    .addEventListener("click", function(e) {
      e.preventDefault();

      isLogin = !isLogin;

      renderToggle();
    });
}

// INITIAL TOGGLE
renderToggle();

// FORM SUBMIT
authForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const user =
    document.getElementById("username").value.trim();

  const pass =
    document.getElementById("password").value.trim();

  if (!user || !pass) {
    alert("Fill all fields");
    return;
  }

  // LOGIN
  if (isLogin) {

    const storedPass = localStorage.getItem(user);

    if (storedPass === null) {
      alert("User not found");
      return;
    }

    if (storedPass !== pass) {
      alert("Incorrect password");
      return;
    }

    localStorage.setItem("loggedInUser", user);

    window.location.href = "dashboard.html";
  }

  // SIGNUP
  else {

    localStorage.setItem(user, pass);

    alert("Signup successful!");

    isLogin = true;

    renderToggle();
  }

  authForm.reset();
});
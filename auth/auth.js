// Register User
function registerUser() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.username === username) || username === "admin") {
    alert("Username already registered!");
    return;
  }

  users.push({ username, password });
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "login_page.html";
  alert("Registration successful! You can now log in.");
}

// Login User
function loginUser() {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  let user = users.find((user) => user.username === username && user.password === password);
  let admin = username === "admin" && password === "admin123";

  if (user) {
    sessionStorage.setItem("auth", JSON.stringify({ auth: true, username: username }));
    window.location.href = "dashboard_page.html";
    alert("Login successful!");
  } else if (admin) {
    sessionStorage.setItem("admin", "true");
    window.location.href = "admin_page.html";
  } else {
    alert("Incorrect username or password!");
  }
}

// Cek Autentikasi
function checkAuth() {
  let auth = JSON.parse(sessionStorage.getItem("auth")) || { auth: false };
  if (!auth.auth) {
    window.location.href = "login_page.html";
    alert("You must log in first!");
  }
}

// Logout
function logout() {
  sessionStorage.removeItem("auth");
  window.location.href = "landing_page.html";
  alert("You have logged out.");
}

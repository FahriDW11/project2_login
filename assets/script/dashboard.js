let nav_user = document.getElementById("nav_user");
let auth = JSON.parse(sessionStorage.getItem("auth"));

nav_user.textContent = "Hi, " + auth.username;

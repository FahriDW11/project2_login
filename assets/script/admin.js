let users = JSON.parse(localStorage.getItem("users")) || [];
let user_table = document.getElementById("users_list");
let validation_overlay = document.getElementById("validation_overlay");

users.map((user) => {
  const list_rows = document.createDocumentFragment();
  const delete_button = document.createElement("img");
  const list = document.createElement("tr");
  list.className = "user_list";
  delete_button.src = "../assets/image/icons/delete-icon-1.png";
  delete_button.className = "delete_button";
  list_rows.appendChild(document.createElement("td")).textContent = user.username;
  list_rows.appendChild(document.createElement("td")).textContent = user.password;
  list_rows.appendChild(document.createElement("td")).appendChild(delete_button);
  list.appendChild(list_rows);
  user_table.appendChild(list);

  delete_button.addEventListener(`click`, () => {
    validation_delete(list);
    validation_overlay.style.display = "block";
  });
});

function save_users() {
  let update_users = [];
  user_table.querySelectorAll(".user_list").forEach((item) => {
    let i = 0;
    let data = {};
    item.querySelectorAll("td").forEach((e) => {
      if (i == 0) data.username = e.textContent;
      else if (i == 1) data.password = e.textContent;
      i++;
    });
    update_users.push(data);
  });
  localStorage.setItem("users", JSON.stringify(update_users));
  console.log(update_users);
}

// validation
function validation_delete(node) {
  const sure_button = document.createElement("button");
  let container_bttn = document.getElementById("validation_buttons");
  sure_button.className = "sure bttn";
  sure_button.textContent = "Sure";
  container_bttn.appendChild(sure_button);

  sure_button.addEventListener(`click`, () => {
    user_table.removeChild(node);
    save_users();
    sure_button.remove();
    validation_overlay.style.display = "none";
  });
}

let cancel_button = document.getElementById("cancel_button");
cancel_button.addEventListener(`click`, () => {
  console.log("makan");
  cancel_button.parentNode.removeChild(cancel_button.parentNode.lastChild);
  validation_overlay.style.display = "none";
});

//auth
let auth_overlay = document.getElementById("auth_overlay");
function checkAuthAdmin() {
  auth_overlay.style.display = "flex";
  if (sessionStorage.admin === "true") {
    auth_overlay.style.display = "none";
  }
}

function logoutAdmin() {
  auth_overlay.style.display = "flex";
  sessionStorage.removeItem("admin");
  window.location.href = "landing_page.html";
}

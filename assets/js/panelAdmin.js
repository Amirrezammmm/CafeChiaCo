const usersDiv = document.querySelector(".Users");
const userTableBody = document.querySelector("#userTable tbody");
const userFormContainer = document.querySelector(".userFormContainer");
const userForm = document.querySelector("#userForm");
const formTitle = document.querySelector("#formTitle");
const addUserBtn = document.querySelector("#addUserBtn");

let editIndex = null;

  const adminName = document.querySelector(".admin-name");
  const dropdown = document.getElementById("adminDropdown");

  adminName.addEventListener("click", function() {
    dropdown.classList.toggle("show");
  });

// گرفتن کاربران از localStorage
function getUsersFromStorage() {
  const users = JSON.parse(localStorage.getItem("Users")) || [];
  return users;
}

// ذخیره کاربران در localStorage
function saveUsersToStorage(users) {
  localStorage.setItem("Users", JSON.stringify(users));
}

// نمایش کاربران در جدول
function renderUserTable() {
  const users = getUsersFromStorage();
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>
        <button class="edit-btn" data-index="${index}">ویرایش</button>
        <button class="delete-btn" data-index="${index}">حذف</button>
      </td>
    `;
    userTableBody.appendChild(row);
  });
}

// افزودن کاربر جدید یا ویرایش
userForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = userForm.querySelector("#name").value.trim();
  const email = userForm.querySelector("#email").value.trim();

  if (!name || !email) return;

  let users = getUsersFromStorage();

  if (editIndex === null) {
    users.push({ name, email });
  } else {
    users[editIndex] = { name, email };
    editIndex = null;
  }

  saveUsersToStorage(users);
  renderUserTable();
  userForm.reset();
  userFormContainer.style.display = "none";
});

// ویرایش / حذف
userTableBody.addEventListener("click", function (e) {
  const index = e.target.dataset.index;
  let users = getUsersFromStorage();

  if (e.target.classList.contains("edit-btn")) {
    const user = users[index];
    userForm.querySelector("#name").value = user.name;
    userForm.querySelector("#email").value = user.email;
    editIndex = index;
    formTitle.textContent = "ویرایش کاربر";
    userFormContainer.style.display = "block";
  }

  if (e.target.classList.contains("delete-btn")) {
    if (confirm("آیا مطمئن هستید که می‌خواهید این کاربر را حذف کنید؟")) {
      users.splice(index, 1);
      saveUsersToStorage(users);
      renderUserTable();
    }
  }
});

// نمایش فرم افزودن کاربر
addUserBtn.addEventListener("click", function () {
  editIndex = null;
  formTitle.textContent = "افزودن کاربر";
  userForm.reset();
  userFormContainer.style.display = "block";
});

// نمایش بخش Users در کلیک روی منو
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".menu").addEventListener("click", function (event) {
    if (event.target.classList.contains("clickableUsers")) {
      const users = document.querySelector(".Users");
      const products = document.querySelector(".Products");
      const tikets = document.querySelector(".Tikets");

      welcome.style.display = "none";
      if (products.innerHTML.trim() !== "") {
        products.style.display = "none";
      }
      if (tikets.innerHTML.trim() !== "") {
        tikets.style.display = "none";
      }

      users.style.display = "block";
      renderUserTable();
    }
  });
});

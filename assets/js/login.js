// آرایه پیش‌فرض اولیه
let defaultUsers = [
  {id: 0, fullName: "Ali Ahmadi", userName: "Ali", email: "Ali123@gmail.com", password: "@ali1234", role: 1},
  {id: 1, fullName: "Amir Rezaei", userName: "Amir", email: "Amir@gmail.com", password: "@Amir88", role: 1},
  {id: 3, fullName: "Amirreza Goodarzi", userName: "Amirreza", email: "Ali123@gmail.com", password: "@Amirreza12", role: 0}
];

// بررسی وجود کاربران در localStorage
let existingUsers = JSON.parse(localStorage.getItem("Users"));

if (!existingUsers || existingUsers.length === 0) {
  // اگر وجود نداشت، مستقیم ذخیره می‌کنیم
  localStorage.setItem("Users", JSON.stringify(defaultUsers));
} else {
  // اگر وجود داشت، بررسی می‌کنیم که تکراری نباشند
  let mergedUsers = [...existingUsers];

  defaultUsers.forEach(defUser => {
    let duplicate = existingUsers.some(user =>
      user.userName.toLowerCase() === defUser.userName.toLowerCase() ||
      user.email.toLowerCase() === defUser.email.toLowerCase()
    );

    if (!duplicate) {
      mergedUsers.push(defUser);
    }
  });

  localStorage.setItem("Users", JSON.stringify(mergedUsers));
}



function login(){
    const storageUsers = JSON.parse(localStorage.getItem("Users")|| []);
    let enteredUsername = document.getElementById("username").value.toLowerCase();
    let enteredPassword  = document.getElementById("password").value; 
    const foundUser = storageUsers.find(user=>
        user.userName.toLowerCase() === enteredUsername && user.password === enteredPassword 
    );
    if(foundUser&&foundUser.role===1){
        alert("با موفقیت وارد شدید");
        window.location.href = "../../index.html";
    }
    else if(foundUser&&foundUser.role === 0){
        alert("با موفقیت وارد شدید");
        window.location.href = "../pages/panelAdmin.html";
    }
    else{
        alert("نام کاربری و رمز عبور یافت نشد");
        window.location.href = "../pages/signup.html";
    }
}


console.log(JSON.parse(localStorage.getItem("Users")));
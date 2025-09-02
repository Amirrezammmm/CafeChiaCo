// اسکریپت
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const inputs = this.querySelectorAll("input");
    let newUser = {};
    let password = "";
    let confirmPassword = "";

    inputs.forEach(input => {
      if (input.name === "password") {
        password = input.value;
      } else if (input.name === "confirmPassword") {
        confirmPassword = input.value;
      } else {
        newUser[input.name] = input.value.trim();
      }
    });

    if (password !== confirmPassword) {
      alert("رمز عبور و تکرار آن یکسان نیست!");
      return;
    }

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      alert("رمز عبور باید حداقل ۸ کاراکتر و شامل حروف بزرگ، کوچک، عدد و نماد باشد!");
      return;
    }

    const usernameRegex = /^[A-Za-z0-9_]+$/;
    if (!usernameRegex.test(newUser.userName)) {
      alert("نام کاربری فقط باید شامل حروف انگلیسی، اعداد یا _ باشد!");
      return;
    }

    let users = JSON.parse(localStorage.getItem("Users")) || [];

    const isDuplicate = users.some(user =>
      user.userName.toLowerCase() === newUser.userName.toLowerCase() ||
      user.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (isDuplicate) {
      alert("نام کاربری یا ایمیل قبلاً ثبت شده است!");
      return;
    }

    newUser.password = password;
    newUser.role = 1;
    const maxId = users.reduce((max, user) => user.id > max ? user.id : max, 0);
    newUser.id = maxId + 1;


    users.push(newUser);
    localStorage.setItem("Users", JSON.stringify(users));

    console.log("کاربر جدید اضافه شد:", newUser);
    alert("ثبت نام با موفقیت انجام شد!");
    this.reset();
    window.location.href = "../pages/login.html";

    console.log("فرم ارسال شد");
    console.log("کاربر جدید:", newUser);
    console.log("همه کاربران فعلی:", users);
    console.log(JSON.parse(localStorage.getItem("Users")));
  });

});





const LOGIN_USER_URL = "/login";

/***
 * login form
 */
let login_form = document.querySelector(".login-form")
let login_username = document.querySelector("#login-username")
let login_password = document.querySelector("#login-password")
let login_button = document.querySelector("#login_button")


/***
 * reset-password form
 */
let reset_password = document.querySelector("#reset-password")
let reset_form = document.querySelector(".reset-form")
let submit_reset_password = document.querySelector(".submit-reset-password")


/*****
 * email-reset form
 */
let email_reset_form = document.querySelector(".email-reset-form")
let reset_password_email = document.querySelector("#reset-password-email")

reset_password.addEventListener("click", function () {
    login_form.style.display = "none"
    reset_form.style.display = "block"

})

/**
 * hard code for reset password
 */
submit_reset_password.addEventListener("click", function () {
    event.preventDefault()

    if(reset_password_email.value.length != 0){
        reset_form.style.display = "none"
        email_reset_form .style.display = "block"
    }else{
        alert("All Field must be filled out")
    }
})

/*****
 * validation client for login
 * check login username and password from the local storage
 */

 /***
  * validation for regiestered users
  */
 const loginUser = async () => {
     // let storeName = localStorage.getItem('userName')
     // let storePassword = localStorage.getItem('password')

     if (login_username.value.length != 0 && login_password.value.length != 0) {
         let userInfo = await postLogin(login_username.value, login_password.value);
         if (userInfo.Error) {
             alert('The username and password are not in the system.');
             return;
         }

         sessionStorage.setItem("user_id", userInfo.user_id);
         sessionStorage.setItem("token", userInfo.token);
         sessionStorage.setItem("is_admin", userInfo.is_admin);
         localStorage.setItem("firstName", userInfo.first_name);

         if (localStorage.getItem('redirectUrl')) {
             location.replace(localStorage.getItem('redirectUrl'));
             return;
         }

         location.replace('../users/landing_page')
     }
};

let postLogin = (username, password) => {
    let createUserRequestParams = {
        username,
        password,
    };

    return fetch(LOGIN_USER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(createUserRequestParams)
    }).then(response => {
        if (response === undefined);
        else {
            return response.text();
        }
    }).then(data => {
        let userInfo = {};

        try {
            let userInfo = JSON.parse(data);

            return userInfo;
        } catch (e) {
            console.log(e);
        }

        return {"Error": "NOT VALID USER INFO"};
    });
};

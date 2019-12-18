/***
 * store user info at local storage
 * set up the key and value pair for later user
 *
 */

const CREATE_USER_URL = "/create";

const registerUser = async () => {
    // e.preventDefault();
    let password = document.querySelector("#password").value
    let confirmPassword = document.querySelector("#confirmPassword").value
    let checkbox = document.querySelector(".checkbox:checked")
    let email = document.querySelector("#email").value

    if(password !== confirmPassword){
        alert('Passwords did not match');
    } else if (password == "") {
        alert('Must type in Password');
    } else if (checkbox === null) {
        alert('Please accept the Terms & Privacy');
    } else if (!email.includes("@mail.sfsu.edu")) {
        alert('You must use an SFSU email');
    } else {
        let firstName  =  document.querySelector("#first_name").value;
        let lastName = document.querySelector("#last_name").value;
        let userName = document.querySelector("#username").value;
        let major = document.querySelector("#major").value;
        let email = document.querySelector("#email").value;
        let password = document.querySelector("#password").value;
        let confirmPassword = document.querySelector("#confirmPassword").value;

        // TODO: Make POST request to /create
        let userInfo = await createUser(firstName, lastName, userName, major, email, password);
        sessionStorage.setItem("user_id", userInfo.user_id);
        sessionStorage.setItem("token", userInfo.token);
        sessionStorage.setItem("is_admin", userInfo.is_admin);

         // localStorage store
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName',lastName);
        localStorage.setItem('userName', userName);
        localStorage.setItem('major',major);
        localStorage.setItem('email',email);

        if (localStorage.getItem('redirectUrl')) {
            location.replace(localStorage.getItem('redirectUrl'));
            return;
        }

        location.replace('../users/landing_page');
        // after signup, automatically login
        sessionStorage.setItem('userName', userName);
    }
};

let createUser = (first_name, last_name, username, major, email, password) => {
    let createUserRequestParams = {
        email,
        username,
        password,
        first_name,
        last_name,
        major
    };

    return fetch(CREATE_USER_URL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true,
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

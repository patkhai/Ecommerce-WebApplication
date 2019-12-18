document.addEventListener("DOMContentLoaded", function() {
    /****
     * check if the user logged in, if the user logged in, then change the nav bar login to exit
      if the user didn't login then switch the exit to log in
      if local storage == session storage
     */
    if(sessionStorage.getItem('user_id')){

        document.querySelector('#nav-login').onclick = function(e){
            clearUserInfoFromSessionStorage();

            location.replace('../users/landing_page')
        };

        document.querySelector('#nav-login').innerHTML = 'Logout';
        document.querySelector('#dashboard').style.display = 'block';
        document.querySelector('#admin_dashboard').style.display = 'block';
        document.querySelector('#register-button').style.display = 'none';
        document.querySelector("#recommendedSection").style.display = 'block';
    } else {
        document.querySelector('#nav-login').innerHTML = 'Login';
    }

    if (sessionStorage.getItem('is_admin') == 'true'){
        document.querySelector('#admin_dashboard').style.display = 'block';
        document.querySelector('#dashboard').style.display = 'block';
        document.querySelector('#nav-login').onclick = function(e){
            clearUserInfoFromSessionStorage();

            location.replace('../users/landing_page')
        };

    }
});

let clearUserInfoFromSessionStorage = () => {
    sessionStorage.removeItem("user_id");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("is_admin");
};


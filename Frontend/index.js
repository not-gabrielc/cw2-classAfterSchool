// //fetch my api to the localhost.
// const fetchPromise = fetch("http://localhost:3000/account-info");
//
// // fetchPromise.then(response => {
// //     console.log(response);
// // });
//
// //shows it as json format
// fetchPromise.then(response => {
//    return response.json();
// });


// async function logins() {
//     const email = document.getElementsByName('email');
//     const password = document.getElementsByName('password');
//     const userType = document.getElementsByName('userType');
//
//     const userAccount = { email, password, userType};
//
//     const options = {
//         method: "POST",
//         header: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(userAccount)
//     };
//     const type = await fetch('http://localhost:3000/login', options);
//     const data = await type.json();
//     console.log(data);
// }
//
// logins();


//---------------------------------------------- Login ------------------------------------------------------
let userArray = [];
const url = 'http://localhost:3000';

var LoginandLogout = new Vue({
    el: "#loginClass",
    data: {
        email: '',
        password: '',
        userType: ''
    },
    methods: {
        //sign up fucntion.
        signup: async function () {

            const emails = this.email;
            const passwords = this.password;
            const userTypes = this.userType;

            let userAccounts = {
                emails,
                passwords,
                userTypes
            };

            const options = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userAccounts)
            };

            fetch(url+'/user-add', options).then( response=> {
                return response.json()
            }).then( data => {
                console.log(data)
            }).catch(err=>{
                console.log(err);
            });

            // const type = await fetch(url+'/user-add', options);
            // const data = await type.json();
            // console.log(data);

            //saves user register on the local storage
            let userArray = '';
            const newEmail = this.email;

            if (localStorage.getItem('users')) {
                // 'users' is an array of objects
                userArray = JSON.parse(localStorage.getItem('users'));
            }
            if (userArray) {
                if (userArray.some(function (user) {
                    return user.email === newEmail
                })) {
                    alert('Email already exists!');
                    return;
                }
                userArray.push({'email': newEmail, 'password': this.password, 'currentUser': this.userType});

                localStorage.setItem('users', JSON.stringify(userArray));
                alert("You are now registered!")
            } else {
                userArray = [{'email': newEmail, 'password': this.password, 'currentUser': this.userType}];
                localStorage.setItem('users', JSON.stringify(userArray));
            }
        },

        //sign in function.
        signin: function () {
            //saves the details of the login into a seperate array
            const login = [{
                'email': this.email,
                'password': this.password,
                'currentUser': this.userType
            }];
            localStorage.setItem('loginUsers', JSON.stringify(login));

            //new array that will contain the parse data
            let loginUser = '';
            const newEmail = this.email;
            const newPassword = this.password;
            const newUserType = this.userType;

            if (localStorage.getItem('users')) {
                // 'users' is an array of objects
                loginUser = JSON.parse(localStorage.getItem('users'));
            }
            if (loginUser) {
                if (loginUser.some(function (user) {
                    return user.email === newEmail
                })) {

                    if (loginUser.some(function (user) {
                        return user.password === newPassword
                    })) {
                        //alerts the user if he/she is online
                        alert("you are now logged in!")
                    } else {
                        alert('Error: The password is not correct.');
                    }
                } else {
                    alert('Error: The email is not correct.');
                }
            } else {
                userArray = [{'email': newEmail, 'password': newPassword, 'currentUser': newUserType}];
                localStorage.setItem('users', JSON.stringify(userArray));
            }
        },

        //sign out function.
        signout: function () {
            this.userType = '';
            this.email = '';
            this.password = '';
        }
    }
});
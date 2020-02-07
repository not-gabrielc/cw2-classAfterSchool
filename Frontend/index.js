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

//---------------------------------------------- classes ------------------------------------------------------

var classCreate = new Vue({
    el: "#classCreate",
    data: {
        topic: '',
        location: '',
        price: '',
        provider: '',
        review: '',
        userEmail: ''
    },
    methods: {
        //create class function.
        createClass: function () {

            const topic = this.topic;
            const location = this.location;
            const price = this.price;
            const provider = this.provider;
            const review = this.review;
            const userEmail = this.userEmail;

            let afterClass = {
                topic,
                location,
                price,
                provider,
                review,
                userEmail
            };

            const def = {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(afterClass)
            };

            fetch(url + '/class-add', def).then(response => {
                return response.json();
            }).then(data => {
                alert("Class created!");
                console.log(data)
            }).catch(err => {
                console.log(err);
            });
        }
    }
});
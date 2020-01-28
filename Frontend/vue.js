// vue.js codes for vue
//----------------------------------------------courses after school------------------------------------------------------

// search bar and list of after school courses (need to add time and review)
let classInfo = {
    courses: [
        {topic: 'math', location: 'hendon', price: 5, review: '2'},
        {topic: 'math', location: 'colindale', price: 10, review: '3'},
        {topic: 'math', location: 'brent cross', price: 15, review: '3'},
        {topic: 'math', location: 'golders green', price: 20, review: '3'},
        {topic: 'english', location: 'hendon', price: 15, review: '2'},
        {topic: 'english', location: 'colindale', price: 10, review: '3'},
        {topic: 'english', location: 'brent cross', price: 5, review: '3'},
        {topic: 'english', location: 'golders green', price: 10, review: '2'},
        {topic: 'piano', location: 'hendon', price: 15, review: '2'},
        {topic: 'piano', location: 'colindale', price: 20, review: '2'},
        {topic: 'piano', location: 'brent cross', price: 15, review: '3'},
        {topic: 'piano', location: 'golders green', price: 10, review: '2'},
        {topic: 'science', location: 'hendon', price: 5, review: '2'},
        {topic: 'science', location: 'colindale', price: 10, review: '3'},
        {topic: 'science', location: 'brent cross', price: 15, review: '3'},
        {topic: 'science', location: 'golders green', price: 20, review: '2'}
    ],
    input: {
        topic: '',
        topics: 'All',
        price: 'All',
        review: 'All',
        sort: 'All',
    },
    sorted: ["↑ Topic ↑", "↓ Topic ↓", "↑ Price ↑", "↓ Price ↓", "↑ Review ↑", "↓ Review ↓"],
    after: [],
};

var searchAndCourses = new Vue({
    el: '#searchBar',
    data: classInfo,
    computed: {
        filterAry() {
            let th = this;

            //topic
            if (th.input.sort === "↑ Topic ↑") {
                th.courses.sort(function compare(a, b) {
                    if (a.topic < b.topic)
                        return -1;
                    if (a.topic > b.topic)
                        return 1;
                    return 0;
                })
            }
            if (th.input.sort === "↓ Topic ↓") {
                th.courses.sort(function compare(a, b) {
                    if (a.topic < b.topic)
                        return 1;
                    if (a.topic > b.topic)
                        return -1;
                    return 0;
                })
            }
            //price
            if (th.input.sort === "↑ Price ↑") {
                th.courses.sort(function compare(a, b) {
                    if (a.price < b.price)
                        return -1;
                    if (a.price > b.price)
                        return 1;
                    return 0;
                })
            }
            if (th.input.sort === "↓ Price ↓") {
                th.courses.sort(function compare(a, b) {
                    if (a.price < b.price)
                        return 1;
                    if (a.price > b.price)
                        return -1;
                    return 0;
                })
            }
            //review
            if (th.input.sort === "↑ Review ↑") {
                th.courses.sort(function compare(a, b) {
                    if (a.review < b.review)
                        return -1;
                    if (a.review > b.review)
                        return 1;
                    return 0;
                })
            }
            if (th.input.sort === "↓ Review ↓") {
                th.courses.sort(function compare(a, b) {
                    if (a.review < b.review)
                        return 1;
                    if (a.review > b.review)
                        return -1;
                    return 0;
                })
            }

            return th.courses.filter(function (cas) {
                if (th.input.topics.length && th.input.topics !== "All" && cas.topic !== th.input.topics) return false;
                if (th.input.review.length && th.input.review !== "All" && cas.review !== th.input.review) return false;
                if (th.input.price && th.input.price !== "All" && cas.price !== th.input.price) return false;
                if (th.input.topic.length) {
                    return cas.topic.indexOf(th.input.topic) > -1
                }
                return true
            })
        },
        topicArray() {
            var th = this;
            let set1 = new Set();
            th.courses.forEach(function (cas) {
                set1.add(cas.topic)
            });
            // console.log(set1)
            return th.after = Array.from(set1)
        },
        priceArray() {
            var th = this;
            let set1 = new Set();
            th.courses.forEach(function (cas) {
                set1.add(cas.price)
            });
            // console.log(set1)
            return th.after = Array.from(set1)
        },
        reviewArray() {
            var th = this;
            let set1 = new Set();
            th.courses.forEach(function (cas) {
                set1.add(cas.review)
            });
            // console.log(set1)
            return th.after = Array.from(set1)
        }
    }
});

//---------------------------------------------- Login ------------------------------------------------------
let userArray = [];

var LoginandLogout = new Vue({
    el: "#loginClass",
    data: {
        userType: '',
        email: '',
        password: ''
    },
    methods: {
        signup: function () {
            const newUser = {
                'email': this.email,
                'password': this.password,
                'currentUser': this.userType
            };

            let userArray = '';
            const newEmail = this.email;
            if (localStorage.getItem('users')) { // 'users' is an array of objects
                userArray = JSON.parse(localStorage.getItem('users'));
            }
            ;
            if (userArray) {
                if (userArray.some(function (user) {
                    return user.email === newEmail
                })) {
                    alert('Email already exists!');
                    return;
                }
                userArray.push({'email': newEmail, 'password': this.password, 'currentUser': this.userType});
                localStorage.setItem('users', JSON.stringify(userArray));
            } else {
                userArray = [{'email': newEmail, 'password': this.password, 'currentUser': this.userType}];
                localStorage.setItem('users', JSON.stringify(userArray));
            }

        },

        signin: function () {
            const login = [{
                'email': this.email,
                'password': this.password,
                'currentUser': this.userType
            }];
            localStorage.setItem('loginUsers', JSON.stringify(login));
            const userLogin = JSON.parse(localStorage.getItem('loginUsers'));

            const savedUser = JSON.parse(localStorage.getItem('users'));
            const save = JSON.stringify(savedUser);
            localStorage.setItem('save', save);

            // for(var i = 0; i < save.length; i += 1) {
            //     if(arr2.indexOf(this[i]) > -1){
            //         ret.push(this[i]);
            //     }
            // }

            // if (save.email === userLogin.email) {
            //     if(save.password === userLogin.password){
            //         if(save.userType === userLogin.userType){
            //             alert('logged in')
            //         }else{
            //             alert('error: UserType is incorrect')
            //         }
            //     }else{
            //         alert('error: password is incorrect ')
            //     }
            //
            // } else {
            //     alert(' error: email is incorrect.')
            // }

        },
        signout: function () {

        }
    }
});
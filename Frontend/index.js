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
        //sign up function.
        signup: async function () {
            //send data to the server.js
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

            fetch(url + '/user-add', options).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
            }).catch(err => {
                console.log(err);
            });
        },
        //sign in function.
        signin: function () {
            //send data to the server.js
            const emails = this.email;

            fetch(url + '/user-find/' + emails).then(response => {
                // Target main element
                return response.json()

            }).then(data => {
                console.log(data)
            }).catch(err => {
                console.log(err);
            });
        },
        //sign out function.
        signout: function () {
            this.userType = '';
            this.email = '';
            this.password = '';
        }
    }
});

//---------------------------------------------- add classes ------------------------------------------------------
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

//---------------------------------------------- showing classes ------------------------------------------------------


// search bar and list of after school courses (need to add time and review)
let classInfo = {
    courses: [
        // {topic: 'math', location: 'hendon', price: 5, review: '2'},
        // {topic: 'math', location: 'colindale', price: 10, review: '3'},
        // {topic: 'math', location: 'brent cross', price: 15, review: '3'},
        // {topic: 'math', location: 'golders green', price: 20, review: '3'},
        // {topic: 'english', location: 'hendon', price: 15, review: '2'},
        // {topic: 'english', location: 'colindale', price: 10, review: '3'},
        // {topic: 'english', location: 'brent cross', price: 5, review: '3'},
        // {topic: 'english', location: 'golders green', price: 10, review: '2'},
        // {topic: 'piano', location: 'hendon', price: 15, review: '2'},
        // {topic: 'piano', location: 'colindale', price: 20, review: '2'},
        // {topic: 'piano', location: 'brent cross', price: 15, review: '3'},
        // {topic: 'piano', location: 'golders green', price: 10, review: '2'},
        // {topic: 'science', location: 'hendon', price: 5, review: '2'},
        // {topic: 'science', location: 'colindale', price: 10, review: '3'},
        // {topic: 'science', location: 'brent cross', price: 15, review: '3'},
        // {topic: 'science', location: 'golders green', price: 20, review: '2'}
    ],
    input: {
        topic: '',
        topics: 'All',
        price: 'All',
        review: 'All',
        // sort: 'All',
    },
    // sorted: ["↑ Topic ↑", "↓ Topic ↓", "↑ Price ↑", "↓ Price ↓", "↑ Review ↑", "↓ Review ↓"],
    // after: [],
};

var searchAndCourses = new Vue({
    el: '#searchBar',
    data: classInfo,
    mounted: async function () {
        const chas = await fetch(url + '/classes');
        classInfo.courses = await chas.json();

    },
    computed: {
        filterAry() {
            let th = this;

            // //topic
            // if (th.input.sort === "↑ Topic ↑") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.topic < b.topic)
            //             return -1;
            //         if (a.topic > b.topic)
            //             return 1;
            //         return 0;
            //     })
            // }
            // if (th.input.sort === "↓ Topic ↓") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.topic < b.topic)
            //             return 1;
            //         if (a.topic > b.topic)
            //             return -1;
            //         return 0;
            //     })
            // }
            // //price
            // if (th.input.sort === "↑ Price ↑") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.price < b.price)
            //             return -1;
            //         if (a.price > b.price)
            //             return 1;
            //         return 0;
            //     })
            // }
            // if (th.input.sort === "↓ Price ↓") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.price < b.price)
            //             return 1;
            //         if (a.price > b.price)
            //             return -1;
            //         return 0;
            //     })
            // }
            // //review
            // if (th.input.sort === "↑ Review ↑") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.review < b.review)
            //             return -1;
            //         if (a.review > b.review)
            //             return 1;
            //         return 0;
            //     })
            // }
            // if (th.input.sort === "↓ Review ↓") {
            //     th.courses.sort(function compare(a, b) {
            //         if (a.review < b.review)
            //             return 1;
            //         if (a.review > b.review)
            //             return -1;
            //         return 0;
            //     })
            // }
            //
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
        // topicArray() {
        //     var th = this;
        //     let set1 = new Set();
        //     th.courses.forEach(function (cas) {
        //         set1.add(cas.topic)
        //     });
        //     // console.log(set1)
        //     return th.after = Array.from(set1)
        // },
        // priceArray() {
        //     var th = this;
        //     let set1 = new Set();
        //     th.courses.forEach(function (cas) {
        //         set1.add(cas.price)
        //     });
        //     // console.log(set1)
        //     return th.after = Array.from(set1)
        // },
        // reviewArray() {
        //     var th = this;
        //     let set1 = new Set();
        //     th.courses.forEach(function (cas) {
        //         set1.add(cas.review)
        //     });
        //     // console.log(set1)
        //     return th.after = Array.from(set1)
        // }
    }
});
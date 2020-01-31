//fetch my api to the localhost.
const fetchPromise = fetch("http://localhost:3000/account-info");

// fetchPromise.then(response => {
//     console.log(response);
// });

//shows it as json format
fetchPromise.then(response => {
   return response.json();
}).then(people => {
    console.log(people);
});
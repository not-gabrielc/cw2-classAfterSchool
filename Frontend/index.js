const fetchPromise = fetch("http://localhost:3000/account-info");
fetchPromise.then(response => {
    console.log(response);

});




// async function asyncCall(){
//     const request = new Request("http://localhost:3000/account-info");
//
//     fetch(request, {mode: "no-cors"}).then(response =>{
//         return response.json();
//     }).catch(function(error) {
//         console.log('Request failed', error)
//     });
//
//
//     // const fetchPromise = fetch("http://localhost:3000/account-info");
//     // await fetchPromise.then(response => {
//     //     console.log(response);
//     // });
// }
//
// asyncCall().then();

async function callThis(){
    await  fetch('http://localhost:3000/account-info')
        .then(function(response) {
            return response.text()
        }).then(function(text) {
        alert(text);
    }).catch(function(err) {
        console.log('Fetch problem: ' + err.message);
    });
}

callThis();



// const fetchPromise = fetch("http://localhost:3000/account-info");
// fetchPromise.then(response => {
//     return response.json();
// }).then(people=> {
//     console.log(people);
// });
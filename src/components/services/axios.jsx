import axios from "axios";
// import database from '../../firebase'


// const instance = axios.create({
//     baseURL : "https://reqres.in"
// });

// const instance = axios.create({
//     baseURL : "https://api-project-1c3a7-default-rtdb.firebaseio.com"
// });
const apibase = axios.create({
    baseURL : "https://api.themoviedb.org"
})
// const apiBase2 = axios.create({
//     baseURL : "https://api.apify.com"
// })
export default apibase
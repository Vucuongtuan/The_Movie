import { db, auth } from '../firebase';
import { child, get, ref, set, remove, update } from 'firebase/database';
import apibase from './axios';

//firebase
const getDataUser = async () => {
  try {
    const snapshot = await get(child(ref(db), 'user'));
    return snapshot.val();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const postDataUser = async (name, email, password, image) => {
  try {
    const snapshot = await get(child(ref(db), 'user'));
    const user = snapshot.val();
    const lengId = user.length;
    const idUser = user[lengId - 1].id;
    const nextId = idUser;
    const userRef = child(ref(db), `user/${lengId}`);
    await set(userRef, {
      id: nextId + 1,
      name: name,
      email: email,
      password: password,
      image: image,
    });
  } catch (error) {
    console.log('Error posting data:', error);
  }
};

const deleteDataUser = async (id) => {
  try {
    const removeRef = child(ref(db), `user/${id - 1}`);
    await remove(removeRef, id);
  } catch (error) {
    console.log('Error delete Data : ', error);
  }
};
const updateDataUser = async (id, name, email, password, image) => {
  try {
    const updateRef = child(ref(db), `user/${id - 1}`);
    await update(updateRef, {
      id,
      name,
      email,
      password,
      image,
    });
  } catch (error) {
    console.log(error);
  }
};

const loginDataUser = async (email, password) => {
  try {
    // const userCredential = await auth.signInWithEmailAndPassword(email, password);
    // const user = userCredential.user;
    // const idToken = await user.getIdToken();

    await auth.auth().signInWithEmailAndPassword(email, password);

    // console.log('Token cua ban la : '+ idToken);
  } catch (error) {
    console.log(error);
  }
};

//apiTheMovieDB
const apikeyMovie = 'e9e9d8da18ae29fc430845952232787c';
const getDataMovie = async (page) => {
  return apibase.get(
    `/3/movie/now_playing?api_key=${apikeyMovie}&language=en-US&page=${page}`,
  );
};
const getTrendingMovie = async () => {
  return apibase.get(
    `/3/trending/movie/day?page=1&api_key=${apikeyMovie}&language=vi-VN`,
  );
};
const getTVMovie = async () => {
  const queryTVMovie = {
    with_genres: '10770',
    sort_by: 'popularity.desc',
    language: 'vi-VN',
    page: 1,
  };
  return apibase.get(
    `/3/discover/movie?api_key=${apikeyMovie}&${new URLSearchParams(
      queryTVMovie,
    )}`,
  );
};
const getMoviePopular = async () => {
  const queryMoviePopular = {
    language: 'vi-VN',
    page: 1,
  };
  return apibase.get(
    `/3/movie/popular?api_key=${apikeyMovie}&${new URLSearchParams(
      queryMoviePopular,
    )}`,
  );
};
const getMOvieTopRated = async () => {
  const queryMovieTopRated = {
    language: 'vi-VN',
    page: 1,
  };
  return apibase.get(
    `/3/movie/top_rated?api_key=${apikeyMovie}&${new URLSearchParams(
      queryMovieTopRated,
    )}`,
  );
};
const getCartoon = async () => {
  const querygetCartoon = {
    with_genres: '16',
    sort_by: 'popularity.desc',
    language: 'vi-VN',
    page: 1,
  };
  return apibase.get(
    `/3/discover/movie?api_key=${apikeyMovie}&${new URLSearchParams(
      querygetCartoon,
    )}`,
  );
};

const getDetailMovie = async (id) => {
  const querygetDetailMovie = {
    language: 'vi-VN',
  };
  return apibase.get(
    `/3/movie/${id}?api_key=${apikeyMovie}&${new URLSearchParams(
      querygetDetailMovie,
    )}`,
  );
};
const getCastMovie = async (id) => {
  const querygetCastMovie = {
    language: 'vi-VN',
  };
  return apibase.get(
    `/3/movie/${id}/casts?api_key=${apikeyMovie}&${new URLSearchParams(
      querygetCastMovie,
    )}`,
  );
};
const getTrailerMovie = async (id) => {
  return apibase.get(`/3/movie/${id}/videos?api_key=${apikeyMovie}`);
};
const getImageMovie = async (id) => {
  return apibase.get(`/3/movie/${id}/images?api_key=${apikeyMovie}`);
};
//export api firebase
export {
  getDataUser,
  postDataUser,
  deleteDataUser,
  updateDataUser,
  loginDataUser,
};
//export api TheMovie
export {
  getDataMovie,
  getTrendingMovie,
  getTVMovie,
  getMoviePopular,
  getMOvieTopRated,
  getCartoon,
  getDetailMovie,
  getCastMovie,
  getTrailerMovie,
  getImageMovie,
};
// const ApiUserService = (page) =>{
//     return axios.get(`/api/users?page=${page}`)
// }
// const ApiAddUser = (name,job)=> {
//     return axios.post("/api/users",{name:name,job:job})
// }
// const ApiDeleteUser = (id) => {
//     return axios.delete(`/api/users/${id}`)
// }
// const ApiUpdateUser = (name, job) => {
//     return axios.put('/api/users',{name:name,job:job})
// }
// export {ApiUserService,ApiAddUser,ApiDeleteUser,ApiUpdateUser}

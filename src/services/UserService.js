import { analytics, auth, database } from '../config/firebase';
import {
  child,
  get,
  ref,
  set,
  remove,
  update,
  push,
  query,
  orderByChild,
  equalTo,
} from 'firebase/database';
import apibase from './axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';

//firebase
const getDataUser = async () => {
  try {
    const snapshot = await get(child(ref(database), 'auth'));
    return snapshot.val();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export async function signup(name, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      name,
      email,
      password,
    );
    console.log('User created successfully:', userCredential.user);
  } catch (error) {
    console.error('Signup error:', error);
  }
}
const postDataUser = async (data) => {
  const emailRef = query(
    ref(database, 'auth'),
    orderByChild('email'),
    equalTo(data.email),
  );
  const emailSnapshot = await get(emailRef);
  if (emailSnapshot.exists()) {
    return false;
  }
  const id = Math.floor(Math.random() * 10000);
  const userRef = ref(database, 'auth/' + id);
  await set(userRef, {
    userId: id,
    name: data.name,
    email: data.email,
    password: data.password,
  });
  return true;
};

const deleteDataUser = async (id) => {
  try {
    const removeRef = child(ref(database), `user/${id - 1}`);
    await remove(removeRef, id);
  } catch (error) {
    console.log('Error delete Data : ', error);
  }
};
const updateDataUser = async (id, name, email, password, image) => {
  try {
    const updateRef = child(ref(database), `user/${id - 1}`);
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

// const loginDataUser = async (email, password) => {
//   try {
//     // const userCredential = await auth.signInWithEmailAndPassword(email, password);
//     // const user = userCredential.user;
//     // const idToken = await user.getIdToken();

//     await auth.auth().signInWithEmailAndPassword(email, password);

//     // console.log('Token cua ban la : '+ idToken);
//   } catch (error) {
//     console.log(error);
//   }
// };

//apiTheMoviedatabase
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
const getSimilarMovie = async (id) => {
  return apibase.get(`/3/movie/${id}/similar?api_key=${apikeyMovie}`);
};
//export api firebase
export { getDataUser, postDataUser, deleteDataUser, updateDataUser };
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
  getSimilarMovie,
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

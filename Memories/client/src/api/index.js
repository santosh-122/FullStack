import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const fetchPosts = () => API.get('/posts');
export const createPost = (newpost) => API.post('/posts',newpost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`, deletePost) ;
export const likePost = (id) => API.patch(`/posts/${id}/likePost`,likePost);

export const signin = (form) => API.post('/user/signin',form)
export const signup = (form) => API.post('/user/signup',form)
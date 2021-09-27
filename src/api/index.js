// src/api/home.js 

import axios from './http';
export const fetchData = options => axios.request({
    ...options,
    url: '/api/login',
});
export const ferchTry = options => axios.request({
    ...options,
    url: '/api/try',
});


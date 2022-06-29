import axios from 'axios';
import queryString from 'qs';
import systemConfig from './config'

const request = axios.create();

const api = (options = {}) => {
    let config = {
        baseURL: systemConfig.endpoints.BACKEND_URL,
        ...options,
        paramsSerializer: (params) =>
            queryString.stringify(params, { arrayFormat: 'repeat' }),
        headers: {
            "Content-Type": "application/json",
            Accept: '*/*',
            ...options.headers,
        },
    };
    if (localStorage.getItem("authTokens")) {
        const tokens = JSON.parse(localStorage.getItem("authTokens"));
        // const tokens = localStorage.getItem("authTokens");
        // console.log(tokens)
        
        config.headers.Authorization = `Bearer ${tokens.access}`;
        // console.log('HEADERS -------> ',config.headers.Authorization)
    }
    return request(config);
};


request.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error)
);

request.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
        }
        return Promise.reject(error.message);
    }
);

export default api;

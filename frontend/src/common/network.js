import axios from "axios";

const baseURL = "http://localhost:4000/api/v1"

const http = axios.create({
    baseURL: baseURL,
    responseType: "json"
});


const PATH = {
    User:{
        SaveUser: `/register`,
        GetUser: `/login`
    }
};


const API = {
    get: (url) => {
        console.log(url)
        return http.get(url)
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },
    getParam: (url, data) => {
        console.log(url)
        return http.get(url, {params: data})
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },

    post: (url, data) => {
        console.log(url)
        return http.post(url, data)
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },

    put: (url, data) => {
        console.log(url)
        return http.put(url, data)
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },

    delete: (url) => {
        console.log(url)
        return http.delete(url)
            .then(res => {
                console.log(res.data)
                return res.data;
            })
            .catch((error) => {
                console.log(error)
            });
    },

    multiGet: (...args) => {
        let reqs = [];
        let indexes = [];
        args.forEach((arg, index) => {
            reqs.push(() => axios.get(baseURL + arg));
            indexes.push(index);
        });

        return axios.all(reqs)
            .then(axios.spread(function (...vars) {
                return vars;
            }));
    }
}

export { API, PATH, baseURL };

import axios from "axios";
import config from "../config/config";

let instanceAxios;

const instance = token => {
  return axios.create({
    // baseURL: config.apiUrl + "/user/login/submission?live=1",
    headers: {
      "Content-Type": "application/json",
      "x-jwt-token": token
    }
  });
};

export const getToken = (email,password) => {
  return new Promise((resolve, reject) => {
    axios({
      url: config.apiUrl + "/user/login/submission?live=1",
      // url: config.apiUrl + "/user/login",
      method: "post",
      data: {
        data: { 
            email, 
            password, 
            submit: true 
         },
         state: "submitted"
     },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        let token = response.headers["x-jwt-token"];
        resolve(token);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const initToken = (email,password) => {
  return new Promise((resolve, reject) => {
    if (!instanceAxios) {
      getToken(email,password)
        .then(token => {
          instanceAxios = instance(token);
          resolve(instanceAxios);
        })
        .catch(err => {
          console.error(err);
          reject();
        });
    } else {
      resolve();
    }
  });
};

export {instanceAxios};

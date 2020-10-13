import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

// 对所有 axios 请求做处理
axios.defaults.withCredentials = true;

export const http = (detailUrl, method, data) => {
    const url = BASE_URL + detailUrl;
   if (method === 'GET') {
    return axios({
        url,
        method,
        params: data
    })
  } else {
    return axios({
        url,
        method,
        data
    })
  }
}

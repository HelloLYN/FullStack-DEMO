import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // 运用到每个请求头中
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // 删除这个权限请求头
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;

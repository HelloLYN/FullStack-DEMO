import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../utils/setAuthToken';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

// 用户注册
// 当路由渲染时， withRouter 会将已经更新的 match ， location 和 history 属性传递给被包裹的组件。
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(() => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// 登陆 返回一个用户token,保存在localStorage
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      const decoded = jwt_decode(token);

      localStorage.setItem('jwtToken', token);
      // 在请求中携带这个token
      setAuthToken(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      }),
    );
};

// 设置保存登陆信息
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// 退出登陆,移除token
export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  // 将current user设置为空,isAuthenticated为false
  dispatch(setCurrentUser({}));
};

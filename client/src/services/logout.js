import axios from 'axios';
import { getUser, clearUser } from './localstore';
import { BASE_URL } from '../constants';

export default () => {
  const token = getUser();
  const params = {
    url: BASE_URL + '/api/logout',
    method: 'post',
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios(params)
    .then(res => {
      const { data: { success = false } } = res;
      if (success === true) {
        clearUser();
        return res.data;
      } else {
        throw new Error(res.data.message);
      }
    })
}
import axios from 'axios';
import { getUser, clearUser } from './localstore';
import { BASE_URL } from '../constants';

export default () => {
  const token = getUser();
  const params = {
    url: BASE_URL + '/api/instances',
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios(params)
    .then(res => {
      const { data: { success = false, instances = [] } } = res;
      if (success === true) {
        return instances;
      } else {
        throw new Error(res.data.message);
      }
    })
}
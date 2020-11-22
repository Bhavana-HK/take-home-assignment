import axios from 'axios';
import { getUser, clearUser } from './localstore';
import { BASE_URL } from '../constants';

export default (status, id) => {
  const token = getUser();
  const params = {
    url: `${BASE_URL}/api/instances/${status}/${id}`,
    method: 'get',
    headers: { Authorization: `Bearer ${token}` },
  }
  return axios(params)
    .then(res => {
      const { data: { success = false, updatedInstance = {} } } = res;
      if (success === true) {
        return updatedInstance;
      } else {
        throw new Error(res.data.message);
      }
    })
}
import axios from 'axios';
import { setUser } from './localstore';
import { BASE_URL } from '../constants';

export default (payload) => {
	const params = {
		url: BASE_URL + '/api/register',
		method: 'post',
		data: payload,
		headers: { 'Content-type': 'application/json' },
	}
	return axios(params)
		.then(res => {
			const { data: { success = false } } = res;
			if (success === true) {
				setUser(res.headers.authorization);
			} else {
				throw new Error(res.data.message);
			}
		})
}
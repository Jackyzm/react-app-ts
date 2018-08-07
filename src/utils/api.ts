// import { stringify } from 'qs';
import request from './request';

export async function getNotice() {
    let result;
    return result = await request('/api/notices', {});
}

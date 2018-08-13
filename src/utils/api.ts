// import { stringify } from 'qs';
import request from './request';

export async function getNotice() {
    return await request('/api/notices', {});
}

export async function getCharts() {
    return await request('/api/charts', {});
}

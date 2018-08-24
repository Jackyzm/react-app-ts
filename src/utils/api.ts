// import { stringify } from 'qs';
import request from './request';

export async function getHeaderNotices() {
    return await request('/api/notices', {});
}

export async function getCharts() {
    return await request('/api/charts', {});
}

export async function getUserCurrent() {
    return await request('/api/userCurrent', {});
}

export async function getTags() {
    return await request('/api/tags', {});
}

export async function getNotice() {
    return await request('/api/project/notice', {});
}

export async function getActivities() {
    return await request('/api/activities', {});
}

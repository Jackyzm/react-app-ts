import { observable, action } from 'mobx';
import { getNotice, getActivities } from '../../utils/api';

/**
 * @class home
 */
class Workplace {
    @observable public notice;
    @observable public activities;

    @action public getNoticeData = () => {
        getNotice().then((res)=>{
            if (res) {
                this.notice = res;
            }
        })
    }

    @action public getActivitiesData = () => {
        getActivities().then((res)=>{
            if (res) {
                this.activities = res;
            }
        })
    }

    @action public clearWorkplace = () =>{
        this.notice = [];
        this.activities = [];
    }

}

export default new Workplace();

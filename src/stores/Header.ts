import { observable, action } from 'mobx';
import { getHeaderNotices, getUserCurrent } from '../utils/api';
/**
 * @class home
 */
class Header {
    @observable public list = [];
    @observable public fetchNotice = true;
    @observable public userCurrent: {notifyCount?: number} = {};

    @action public getHeaderNotice = () => {
        getHeaderNotices().then((res)=>{
            this.list = res;
        });
    };

    @action public changeFetchNotice = () => {
        const status = this.fetchNotice;
        setTimeout(()=>{
            this.fetchNotice = !status;
        }, 500)
    };

    @action public getUserCurrentData = () => {
        getUserCurrent().then((res)=>{
            this.userCurrent = res;
        });
    }

    @action public clearNotices = (type) => {
        const newList = this.list.filter(item => item.type !== type);
        this.list = newList;
        this.changeNoticesLength(this.list.length);
    }

    @action public changeNoticesLength = (num) =>{
        if ( this.userCurrent && this.userCurrent.notifyCount ) {
            this.userCurrent.notifyCount = num;
        }
    }
}

export default new Header();

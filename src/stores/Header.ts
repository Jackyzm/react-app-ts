import { observable, action } from 'mobx';
import { getNotice } from '../utils/api';
/**
 * @class home
 */
class Header {
    @observable public list = [];
    @observable public fetchNotice = true;

    @action public getHeaderNotice = () => {
        getNotice().then((res)=>{
            this.list = res;
            // console.debug(res);
        });
    };

    @action public changeFetchNotice = () => {
        const status = this.fetchNotice;
        setTimeout(()=>{
            this.fetchNotice = !status;
        }, 500)
    };

}

export default new Header();

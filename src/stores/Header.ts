import { observable, action } from 'mobx';
import { getNotice } from '../utils/api';
/**
 * @class home
 */
class Header {
    @observable public list = [];

    @action public getHeaderNotice = () => {
        getNotice().then((res)=>{
            this.list = res;
            console.debug(res);
        });
    };
}

export default new Header();

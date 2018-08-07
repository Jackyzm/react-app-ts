import { observable, action } from 'mobx';
import { getNotice } from '../utils/api';
/**
 * @class home
 */
class App {
    @observable public list = [];

    @action public getHeaderNotice = () => {
        getNotice().then((res)=>{
            console.debug(res);
        });
    };
}

export default new App();

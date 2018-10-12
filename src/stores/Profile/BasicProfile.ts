import { observable, action } from 'mobx';
import { getBasicProfile } from '../../utils/api';

/**
 * @class home
 */
class BasicProfile {
    @observable public list={};
    @observable public loading=false;

    @action public getList = () => {
        this.loading = true;
        getBasicProfile().then((res)=>{
            if (res) {
                this.loading = false;
                this.list = res;
            }
        })
    }

    @action public clearList = () =>{
        this.list = [];
    }
}

export default new BasicProfile();

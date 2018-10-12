import { observable, action } from 'mobx';
import { getAdvancedProfile } from '../../utils/api';

/**
 * @class home
 */
class AdvancedProfile {
    @observable public list={};
    @observable public loading=false;

    @action public getList = () => {
        this.loading = true;
        getAdvancedProfile().then((res)=>{
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

export default new AdvancedProfile();

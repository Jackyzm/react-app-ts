import { observable, action } from 'mobx';
import { getTags } from '../../utils/api';

/**
 * @class home
 */
class Monitor {
    @observable public monitor;

    @action public getTagsData = () => {
        getTags().then((res)=>{
            if (res) {
                console.debug(res.list);
                this.monitor = res.list;
            }
        })
    }

    @action public clearTagsData = () =>{
        this.monitor = [];
    }

}

export default new Monitor();

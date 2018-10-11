import { observable, action } from 'mobx';
import { getFakeList } from '../../utils/api';

/**
 * @class home
 */
class FakeList {
    @observable public list=[];
    @observable public loading=false;

    @action public getList = (params) => {
        this.loading = true;
        getFakeList(params).then((res)=>{
            if (res) {
                this.loading = false;
                this.list = res;
            }
        })
    }

    @action public clearList = () =>{
        this.list = [];
    }

    @action public getMoreList = (params) =>{
        this.loading = true;
        getFakeList(params).then((res)=>{
            if (res) {
                this.loading = false;
                this.list = this.list.concat(res);
            }
        })
    }
}

export default new FakeList();

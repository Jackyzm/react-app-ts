import { observable, action } from 'mobx';
import { getTableList, addTableList, deleteTableList } from '../../utils/api';

/**
 * @class home
 */
class TableList {
    @observable public list=[];
    @observable public loading=false;

    @action public getList = (params) => {
        this.loading = true;
        getTableList(params).then((res)=>{
            if (res) {
                this.loading = false;
                this.list = res;
            }
        })
    }

    @action public clearList = () =>{
        this.list = [];
    }

    @action public addList = (params) =>{
        this.loading = true;
        addTableList(params).then((res)=>{
            if (res) {
                this.loading = false;
                this.list = res;
            }
        })
    }

    @action public deleteList = (params, callback) =>{
        this.loading = true;
        deleteTableList(params).then((res)=>{
            if (res) {
                this.loading = false;
                this.list = res;
                callback();
            }
        })
    }

}

export default new TableList();

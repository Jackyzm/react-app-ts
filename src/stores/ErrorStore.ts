import { observable, action } from 'mobx';
import { query } from '../utils/api';

/**
 * @class home
 */
class ErrorStore {
    @observable public loading=false;

    @action public setError = (code) => {
        this.loading = true;
        query(code).then((res)=>{
            if (res) {
                console.debug(res);
            }
        })
    }
}

export default new ErrorStore();

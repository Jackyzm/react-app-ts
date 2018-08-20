import { observable, action } from 'mobx';
import { getCharts } from '../../utils/api';

/**
 * @class home
 */
class Analysis {
    @observable public chart:object = {};

    @action public getChartsData = () => {
        getCharts().then((res)=>{
            // console.debug(res);
            if (res) {
                this.chart = res;
            }
        })
    }

    @action public clearChartsData = () =>{
        this.chart = {};
    }

}

export default new Analysis();

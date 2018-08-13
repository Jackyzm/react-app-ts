import { observable, action } from 'mobx';
import { getCharts } from '../../utils/api';

/**
 * @class home
 */
class Analysis {
    @observable public chart = {};

    @action public getChartsData = () => {
        getCharts().then((res)=>{
            console.debug(res);
            this.chart = res;
        })
    }

}

export default new Analysis();

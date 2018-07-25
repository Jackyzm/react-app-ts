import { observable, action } from 'mobx';

/**
 * @class home
 */
class Home {

    @observable public num = 0;

    @action public addNum(num) {
        return ++num;
    }

    @action public cutNum(num) {
        return --num;
    }
}

export default new Home();

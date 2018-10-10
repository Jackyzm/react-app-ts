import { observable, action } from 'mobx';
import { basicFormSubmit } from '../../utils/api';
import { message } from 'antd';

/**
 * @class home
 */
class BasicForm {
    @observable public res:object = {};

    @action public submitBasicFormData = (params) => {
        basicFormSubmit(params).then((res)=>{
            // console.debug(res);
            if (res && res.success) {
                message.success('提交成功！');
                this.res = res;
            }
        })
    }

    @action public clearSubmitBasicForm = () =>{
        this.res = {};
    }

}

export default new BasicForm();

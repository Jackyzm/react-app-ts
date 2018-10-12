import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Spin, Card } from 'antd';
import './style.less';

// @connect(state => ({
//     isloading: state.error.isloading,
// }))
@inject( (store: {ErrorStore}) => {
    return {
        setError: store.ErrorStore.setError,
    }
})
@observer
export default class TriggerException extends React.Component<{setError:(code)=>void}, {isloading:boolean}> {
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
        }
    }

    private triggerError = code => {
        this.setState({
            isloading: true,
        });
        this.props.setError(code);
    };
    public render() {
        return (
            <Card>
                <Spin spinning={this.state.isloading} wrapperClassName={'trigger'}>
                    <Button type="danger" onClick={() => this.triggerError(401)}>
                        触发401
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(403)}>
                        触发403
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(500)}>
                        触发500
                    </Button>
                    <Button type="danger" onClick={() => this.triggerError(404)}>
                        触发404
                    </Button>
                </Spin>
            </Card>
        );
    }
}

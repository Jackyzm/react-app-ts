import * as React from 'react';
import { Button, Spin, Card } from 'antd';
import './style.less';

// @connect(state => ({
//     isloading: state.error.isloading,
// }))
export default class TriggerException extends React.Component<{}, {isloading:boolean}> {
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
        // this.props.dispatch({
        //     type: 'error/query',
        //     payload: {
        //         code,
        //     },
        // });
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

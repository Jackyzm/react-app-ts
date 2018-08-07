import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';

/**
 * @class Test
 * @extends {React.Component}
 */
@inject( (store: {Home}) => {
    return {
        num: store.Home.num,
        addNum: store.Home.addNum,
        cutNum: store.Home.cutNum,
        list: store.Home.list,
    }
})
@observer
class Test extends React.Component<{num: number, addNum: (num: number) => void, cutNum: (num: number) => void, list }, {}> {
    public render() {
        const { num, addNum, cutNum, list } = this.props;
        console.debug(this.props, list);
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload {num}.
                </p>
                <Button type="primary" onClick={() => addNum(num)}>Button</Button>
                <Button type="primary" onClick={() => cutNum(num) }>Button</Button>
                <Link to='/home'>home</Link>
            </div>
        );
    }
}

export default Test;

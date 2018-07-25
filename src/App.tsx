import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import './App.less';

/**
 * @class App
 * @extends {React.Component}
 */
@observer
@inject( (store: {App}) => {
    return {
        num: store.App.num,
        addNum: store.App.addNum,
        cutNum: store.App.cutNum,
        list: store.App.list,
    }
})
class App extends React.Component<{num: number, addNum: (num: number) => void, cutNum: (num: number) => void, list }, {}> {
    public render() {
        console.debug(this.props);
        const { num, addNum, cutNum, list } = this.props;
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

export default App;

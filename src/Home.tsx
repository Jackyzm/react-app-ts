import * as React from 'react';
import { Row, Col } from 'antd';
import './App.less';

class Home extends React.Component {
    public render() {
        return (
            <Row className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.tsx</code> and save to reload.
                </p>
                <Col>
                    123
                </Col>
            </Row>
        );
    }
}

export default Home;

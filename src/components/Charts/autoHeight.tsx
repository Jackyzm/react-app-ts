import React from 'react';

function computeHeight(node) {
    const totalHeight = parseInt(getComputedStyle(node).height, 10);
    const padding =
        parseInt(getComputedStyle(node).paddingTop, 10) +
        parseInt(getComputedStyle(node).paddingBottom, 10);
    return totalHeight - padding;
}

function getAutoHeight(n) {
    if (!n) {
        return 0;
    }

    let node = n;

    let height = computeHeight(node);

    while (!height) {
        node = node.parentNode;
        if (node) {
            height = computeHeight(node);
        } else {
            break;
        }
    }

    return height;
}

const autoHeight = () => WrappedComponent => {
    return class extends React.Component<{height?}, {computedHeight?}> {
        public root;
        public timer;
        public node;
        public resize;
        public renderChart;
        public handleRef;
        public chart;
        public getG2Instance;
        public getLegendData;
        public handleLegendClick;
        public getLengendData;
        public isUnmount;
        public imageMask;
        public saveRootRef;
        public initTagCloud;
        constructor(props) {
            super(props);
            this.state={
                computedHeight: 0,
            }
        }
        public componentWillUnmount() {
            // qqq
        }
        public componentDidMount() {
            const { height } = this.props;
            if (!height) {
                const h = getAutoHeight(this.root);
                this.setState({ computedHeight: h });
            }
        }

        public componentWillReceiveProps() {
            // because of charts data create when rendered
            // so there is a trick for get rendered time
        }

        public handleRoot = node => {
            this.root = node;
        };

        public render() {
            const { height } = this.props;
            const { computedHeight } = this.state;
            const h = height || computedHeight;
            return (
                <div ref={this.handleRoot}>{h > 0 && <WrappedComponent {...this.props} height={h} />}</div>
            );
        }
    };
};

export default autoHeight;

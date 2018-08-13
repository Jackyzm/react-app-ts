import * as React from 'react';
import { Chart, Axis, Tooltip, Geom } from 'bizcharts';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';
import '../index.less';


export interface IBarProps {
    title?: React.ReactNode;
    color?: string;
    padding?: any;
    height?: number;
    data?: Array<{
        x: string;
        y: number;
    }>;
    autoLabel?: boolean;
    style?: React.CSSProperties;
    forceFit?: boolean
}
@autoHeight()
class Bar extends React.Component<IBarProps, {autoHideXLabels?: boolean, computedHeight?}> {
    public node;
    public root;

    constructor(props) {
        super(props);
        this.state = {
            autoHideXLabels: false,
        }
    }

    public componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    @Bind()
    @Debounce(400)
    public resize() {
        if (!this.node) {
            return;
        }
        const canvasWidth = this.node.parentNode.clientWidth;
        const { data = [], autoLabel = true } = this.props;
        if (!autoLabel) {
            return;
        }
        const minWidth = data.length * 30;
        const { autoHideXLabels } = this.state;

        if (canvasWidth <= minWidth) {
            if (!autoHideXLabels) {
                this.setState({
                    autoHideXLabels: true,
                });
            }
        } else if (autoHideXLabels) {
            this.setState({
                autoHideXLabels: false,
            });
        }
    }

    public handleRoot = n => {
        this.root = n;
    };

    public handleRef = n => {
        this.node = n;
    };

    public render() {
        const {
            height,
            title,
            forceFit = true,
            data,
            color = 'rgba(24, 144, 255, 0.85)',
            padding,
        } = this.props;

        const { autoHideXLabels } = this.state;

        const scale = {
            x: {
                type: 'cat',
            },
            y: {
                min: 0,
            },
        };

        const tooltip:[string, (x?: any, y?: any) => { name?: string; value: string; }] = [
            'x*y',
            (x, y) => ({
                name: x,
                value: y,
            }),
        ];

        return (
            <div className={'chart'} style={{ height }} ref={this.handleRoot}>
                <div ref={this.handleRef}>
                    {title && <h4 style={{ marginBottom: 20 }}>{title}</h4>}
                    {data ? <Chart
                        scale={scale}
                        height={title ? height - 41 : height}
                        forceFit={forceFit}
                        data={data}
                        padding={padding || 'auto'}
                    >
                        <Axis
                            name="x"
                            title={{}}
                            // label={autoHideXLabels ? false : {}}
                            // tickLine={autoHideXLabels ? false : {}}
                        />
                        <Axis
                            name="y"
                            // min={0}
                            />
                        <Tooltip
                            showTitle={false}
                            crosshairs={{}}
                            />
                        <Geom
                            type="interval"
                            position="x*y"
                            color={color}
                            tooltip={tooltip}
                            />
                    </Chart> : '' }
                </div>
            </div>
        );
    }
}

export default Bar;

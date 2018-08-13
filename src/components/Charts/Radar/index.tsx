import * as React from 'react';
import { Chart, Tooltip, Geom, Coord, Axis } from 'bizcharts';
import { Row, Col } from 'antd';
import autoHeight from '../autoHeight';
import './index.less';

export interface IRadarProps {
    title?: React.ReactNode;
    height?: number;
    padding?: any,
    hasLegend?: boolean,
    data?: Array<{
        name: string,
        label: string,
        value: string,
    }>;
    style?: React.CSSProperties;
    forceFit?: boolean,
    tickCount?: number,
    animate?: boolean,
    colors?: string[],
}

@autoHeight()
class Radar extends React.Component<IRadarProps, {legendData?, computedHeight?}> {
    public chart;
    public node;
    constructor(props) {
        super(props);
        this.state={
            legendData: [],
        }
    }

    public componentDidMount() {
        this.getLengendData();
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.data !== nextProps.data) {
            this.getLengendData();
        }
    }

    public getG2Instance = chart => {
        this.chart = chart;
    };

    // for custom lengend view
    public getLengendData = () => {
        if (!this.chart){
            return;
        }
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        const items = geom.get('dataArray') || []; // 获取图形对应的

        const legendData = items.map(item => {
            const origins = item.map(t => t._origin);
            const result = {
                name: origins[0].name,
                color: item[0].color,
                checked: true,
                value: origins.reduce((p, n) => p + n.value, 0),
            };

            return result;
        });

        this.setState({
            legendData,
        });
    };

    public handleRef = n => {
        this.node = n;
    };

    public handleLegendClick = (item, i) => {
        const newItem = item;
        newItem.checked = !newItem.checked;

        const { legendData } = this.state;
        legendData[i] = newItem;

        const filteredLegendData = legendData.filter(l => l.checked).map(l => l.name);

        if (this.chart) {
            this.chart.filter('name', val => filteredLegendData.indexOf(val) > -1);
            this.chart.repaint();
        }

        this.setState({
            legendData,
        });
    };

    public render() {
        const defaultColors = [
            '#1890FF',
            '#FACC14',
            '#2FC25B',
            '#8543E0',
            '#F04864',
            '#13C2C2',
            '#fa8c16',
            '#a0d911',
        ];

        const {
            data = [],
            height = 0,
            title,
            hasLegend = false,
            forceFit = true,
            tickCount = 4,
            padding = [35, 30, 16, 30],
            animate = true,
            colors = defaultColors,
        } = this.props;

        const { legendData } = this.state;

        const scale = {
            value: {
                min: 0,
                tickCount,
            },
        };

        const chartHeight = height - (hasLegend ? 80 : 22);

        return (
            <div className={'radar'} style={{ height }}>
                {title && <h4>{title}</h4>}
                <Chart
                    scale={scale}
                    height={chartHeight}
                    forceFit={forceFit}
                    data={data}
                    padding={padding}
                    animate={animate}
                    onGetG2Instance={this.getG2Instance}
                >
                    <Tooltip />
                    <Coord type="polar" />
                    <Axis
                        name="label"
                        line={null}
                        tickLine={null}
                        grid={{
                            lineStyle: {
                                lineDash: null,
                            },
                            hideFirstLine: false,
                        }}
                    />
                    <Axis
                        name="value"
                        grid={{
                            type: 'polygon',
                            lineStyle: {
                                lineDash: null,
                            },
                        }}
                    />
                    <Geom type="line" position="label*value" color={['name', colors]} size={1} />
                    <Geom
                        type="point"
                        position="label*value"
                        color={['name', colors]}
                        shape="circle"
                        size={3}
                    />
                </Chart>
                {hasLegend && (
                    <Row className={'legend'}>
                        {legendData.map((item, i) => (
                            <Col
                                span={24 / legendData.length}
                                key={item.name}
                                onClick={() => this.handleLegendClick(item, i)}
                            >
                                <div className={'legendItem'}>
                                    <p>
                                        <span
                                            className={'dot'}
                                            style={{
                                                backgroundColor: !item.checked ? '#aaa' : item.color,
                                            }}
                                        />
                                        <span>{item.name}</span>
                                    </p>
                                    <h6>{item.value}</h6>
                                </div>
                            </Col>
                        ))}
                    </Row>
                )}
            </div>
        );
    }
}

export default Radar;

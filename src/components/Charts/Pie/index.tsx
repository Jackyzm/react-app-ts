import * as React from 'react';
import { Chart, Tooltip, Geom, Coord } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { Divider } from 'antd';
import ReactFitText from 'react-fittext';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';

import './index.less';
export interface IPieProps {
    animate?: boolean;
    color?: string;
    height?: number;
    hasLegend?: boolean;
    padding?: any;
    percent?: string;
    data?: Array<{
        x: string | string;
        y: number;
    }>;
    total?: React.ReactNode | number | (() => React.ReactNode | number);
    title?: React.ReactNode;
    tooltip?: any;
    valueFormat?: (value: string) => string | React.ReactNode;
    subTitle?: React.ReactNode;
    selected?: any,

    style?: React.CSSProperties;
    forceFit?: boolean,
    inner?: number,
    colors?: string,
    lineWidth?: number,
    nextContext?: any,
    margin?: any,
}

/* eslint react/no-danger:0 */
@autoHeight()
class Pie extends React.Component<IPieProps, {legendData?, legendBlock?:boolean, computedHeight?}> {
    public chart;
    public root;
    constructor(props) {
        super(props);
        this.state = {
            legendData: [],
            legendBlock: false,
        }
    }

    public componentDidMount() {
        this.getLegendData();
        this.resize();
        window.addEventListener('resize', this.resize);
    }

    public componentWillReceiveProps(nextProps: IPieProps, nextContext: any) {
        if (this.props.data !== nextProps.data) {
            // because of charts data create when rendered
            // so there is a trick for get rendered time
            this.setState(
                {
                    legendData: [...this.state.legendData],
                },
                () => {
                    this.getLegendData();
                }
            );
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
        // this.resize.cancel();
    }

    public getG2Instance = chart => {
        this.chart = chart;
    };

    // for custom lengend view
    public getLegendData = () => {
        if (!this.chart){
            return;
        }
        const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
        const items = geom.get('dataArray') || []; // 获取图形对应的

        const legendData = items.map(item => {
            /* eslint no-underscore-dangle:0 */
            const origin = item[0]._origin;
            origin.color = item[0].color;
            origin.checked = true;
            return origin;
        });

        this.setState({
            legendData,
        });
    };

    // for window resize auto responsive legend
    @Bind()
    @Debounce(300)
    public resize() {
        const { hasLegend } = this.props;
        if (!hasLegend || !this.root) {
            window.removeEventListener('resize', this.resize);
            return;
        }
        if (this.root.parentNode.clientWidth <= 380) {
            if (!this.state.legendBlock) {
                this.setState({
                    legendBlock: true,
                });
            }
        } else if (this.state.legendBlock) {
            this.setState({
                legendBlock: false,
            });
        }
    }

    public handleRoot = n => {
        this.root = n;
    };

    public handleLegendClick = (item, i) => {
        const newItem = item;
        newItem.checked = !newItem.checked;

        const { legendData } = this.state;
        legendData[i] = newItem;

        const filteredLegendData = legendData.filter(l => l.checked).map(l => l.x);

        if (this.chart) {
            this.chart.filter('x', val => filteredLegendData.indexOf(val) > -1);
        }

        this.setState({
            legendData,
        });
    };

    public render() {
        const {
            valueFormat,
            subTitle,
            total,
            hasLegend = false,
            style,
            height,
            forceFit = true,
            percent = 0,
            color,
            inner = 0.75,
            animate = true,
            colors,
            lineWidth = 1,
        } = this.props;

        const { legendData, legendBlock } = this.state;


        const defaultColors = colors;
        let data = this.props.data || [];
        let selected = this.props.selected || true;
        let tooltip = this.props.tooltip || true;
        let formatColor;

        const scale = {
            x: {
                type: 'cat',
                range: [0, 1],
            },
            y: {
                min: 0,
            },
        };

        if (percent) {
            selected = false;
            tooltip = false;
            formatColor = value => {
                if (value === '占比') {
                    return color || 'rgba(24, 144, 255, 0.85)';
                } else {
                    return '#F0F2F5';
                }
            };

            data = [
                {
                    x: '占比',
                    y: parseFloat(percent),
                },
                {
                    x: '反比',
                    y: 100 - parseFloat(percent),
                },
            ];
        }

        const tooltipFormat: [string, (x?: any, y?: any) => { name?: string; value: string; }] = [
            'x*percent',
            (x, p) => ({
                name: x,
                value: `${(p * 100).toFixed(2)}%`,
            }),
        ];

        const padding: any = [12, 0, 12, 0];

        const dv = new DataView();
        dv.source(data).transform({
            type: 'percent',
            field: 'y',
            dimension: 'x',
            as: 'percent',
        });
        console.debug(dv);
        return (
            <div ref={this.handleRoot} className={`pie ${!!hasLegend? 'hasLegend':''} ${legendBlock? 'legendBlock':''}`} style={style}>
                <ReactFitText maxFontSize={25}>
                    <div className={'chart'}>
                        {dv.rows.length>0? <Chart
                            scale={scale}
                            height={height}
                            forceFit={forceFit}
                            data={dv}
                            padding={padding}
                            animate={animate}
                            onGetG2Instance={this.getG2Instance}
                        >
                            {!!tooltip && <Tooltip showTitle={false} />}
                            <Coord type="theta" innerRadius={inner} />
                            <Geom
                                style={{ lineWidth, stroke: '#fff' }}
                                tooltip={tooltip && tooltipFormat}
                                type="intervalStack"
                                position="percent"
                                color={['x', percent ? formatColor : defaultColors]}
                                // selected={selected}
                            />
                        </Chart> : ''}

                        {(subTitle || total) && (
                            <div className={'total'}>
                                {subTitle && <h4 className="pie-sub-title">{subTitle}</h4>}
                                {/* eslint-disable-next-line */}
                                {total && (
                                    <div className="pie-stat">{typeof total === 'function' ? total() : total}</div>
                                )}
                            </div>
                        )}
                    </div>
                </ReactFitText>

                {hasLegend && (
                    <ul className={'legend'}>
                        {legendData.map((item, i) => (
                            <li key={item.x} onClick={() => this.handleLegendClick(item, i)}>
                                <span
                                    className={'dot'}
                                    style={{
                                        backgroundColor: !item.checked ? '#aaa' : item.color,
                                    }}
                                />
                                <span className={'legendTitle'}>{item.x}</span>
                                <Divider type="vertical" />
                                <span className={'percent'}>
                                    {`${(isNaN(item.percent) ? 0 : item.percent * 100).toFixed(2)}%`}
                                </span>
                                <span className={'value'}>{valueFormat ? valueFormat(item.y) : item.y}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
}

export default Pie;

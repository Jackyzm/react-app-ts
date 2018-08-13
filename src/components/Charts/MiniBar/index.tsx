import * as React from 'react';
import { Chart, Tooltip, Geom } from 'bizcharts';
import autoHeight from '../autoHeight';
import '../index.less';

export interface IMiniBarProps {
    color?: string;
    height?: number;
    data?: Array<{
        x: number | string;
        y: number;
    }>;
    style?: React.CSSProperties;
    forceFit?:boolean,
}

@autoHeight()
export default class MiniBar extends React.Component<IMiniBarProps> {
    public render() {
        const { height, forceFit = true, color = '#1890FF', data } = this.props;
        console.debug(data);
        const scale = {
            x: {
                type: 'cat',
            },
            y: {
                min: 0,
            },
        };

        const padding:any = [36, 5, 30, 5];

        const tooltip:[string, (x?: any, y?: any) => { name?: string; value: string; }] = [
            'x*y',
            (x, y) => ({
                name: x,
                value: y,
            }),
        ];

        // for tooltip not to be hide
        const chartHeight = height + 54;

        return (
            <div className={'miniChart'} style={{ height }}>
                <div className={'chartContent'}>
                    <Chart
                        scale={scale}
                        height={chartHeight}
                        forceFit={forceFit}
                        data={data}
                        padding={padding}
                    >
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
                    </Chart>
                </div>
            </div>
        );
    }
}

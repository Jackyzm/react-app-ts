import * as React from 'react';
import { Tooltip } from 'antd';
import './index.less';

export interface IMiniProgressProps {
    target: number,
    color?: string,
    strokeWidth?: number,
    percent?: number,
    style?: React.CSSProperties,
}

class MiniProgress extends React.Component<IMiniProgressProps, any> {
    public render() {
        const { target, color, percent, strokeWidth } = this.props;
        return (
            <div className={'miniProgress'}>
            <Tooltip title={`目标值: ${target}%`}>
                <div className={'target'} style={{ left: target ? `${target}%` : null }}>
                    <span style={{ backgroundColor: color || null }} />
                    <span style={{ backgroundColor: color || null }} />
                </div>
            </Tooltip>
            <div className={'progressWrap'}>
                <div
                    className={'progress'}
                    style={{
                        backgroundColor: color || 'rgb(19, 194, 194)',
                        width: percent ? `${percent}%` : null,
                        height: strokeWidth || null,
                    }}
                />
            </div>
        </div>
        )
    }
}

export default MiniProgress;

import * as React from 'react';
import { Card, Spin } from 'antd';
import './index.less';

export interface IChartCardProps {
    title: React.ReactNode;
    action?: React.ReactNode;
    total?: React.ReactNode | number | (() => React.ReactNode | number);
    footer?: React.ReactNode;
    contentHeight?: number;
    avatar?: React.ReactNode;
    style?: React.CSSProperties;
    loading?: boolean,
    bordered?: boolean,
}

const renderTotal = total => {
    let totalDom;
    switch (typeof total) {
        case 'undefined':
            totalDom = null;
            break;
        case 'function':
            totalDom = <div className={'total'}>{total()}</div>;
            break;
        default:
            totalDom = <div className={'total'}>{total}</div>;
    }
    return totalDom;
};

class ChartCard extends React.Component<IChartCardProps> {
    public render() {
        const {
                loading = false,
                contentHeight,
                title,
                avatar,
                action,
                total,
                footer,
                children,
                ...rest
            } = this.props;
        const content = (
            <div className={'chartCard'}>
                <div
                    className={`chartTop ${!children && !footer ? 'chartTopMargin' : ''}`}
                >
                    <div className={'avatar'}>{avatar}</div>
                    <div className={'metaWrap'}>
                        <div className={'meta'}>
                            <span className={'title'}>{title}</span>
                            <span className={'action'}>{action}</span>
                        </div>
                        {renderTotal(total)}
                    </div>
                </div>
                {children && (
                    <div className={'content'} style={{ height: contentHeight || 'auto' }}>
                        <div className={contentHeight && 'contentFixed'}>{children}</div>
                    </div>
                )}
                {footer && (
                    <div
                        className={`footer ${!children ? 'footerMargin' : ''}`}
                    >
                        {footer}
                    </div>
                )}
            </div>
        );
        return (
            <Card bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
                {
                    <Spin spinning={loading} wrapperClassName={'spin'}>
                        {content}
                    </Spin>
                }
            </Card>
        );
    }
}
// const ChartCard = () => {

export default ChartCard;

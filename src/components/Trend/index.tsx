import * as React from 'react';
import { Icon } from 'antd';
import './index.less';

export interface ITrendProps {
  colorful?: boolean;
  flag: 'up' | 'down';
  style?: React.CSSProperties;
  reverseColor?: boolean;
  className?: string,
}

class Trend extends React.Component<ITrendProps> {
    public render() {
        const { colorful = true, reverseColor = false, flag, children, className, ...rest } = this.props;
        return (
            <div {...rest} className={`${className} trendItem ${!colorful ? 'trendItemGrey':''} ${reverseColor && colorful? 'reverseColor':''}`} title={typeof children === 'string' ? children : ''}>
                <span className={'value'}>{children}</span>
                {flag && (
                    <span className={`${flag}`}>
                        <Icon type={`caret-${flag}`} />
                    </span>
                )}
            </div>
        );
    }
}

export default Trend;

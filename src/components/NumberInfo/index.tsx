import * as React from 'react';
import { Icon } from 'antd';
import './index.less';


export interface INumberInfoProps {
  title?: React.ReactNode | string;
  subTitle?: React.ReactNode | string;
  total?: React.ReactNode | string;
  status?: 'up' | 'down';
  theme?: string;
  gap?: number;
  subTotal?: number;
  style?: React.CSSProperties;
  suffix?: number
}

class NumberInfo extends React.Component<INumberInfoProps> {
    public render() {
        const { theme, title, subTitle, total, subTotal, status, suffix, gap, ...rest } = this.props;
        return (
            <div
                className={`numberInfo ${theme ? `numberInfo${theme}` : ''}`}
                {...rest}
            >
                {title && <div className={'numberInfoTitle'}>{title}</div>}
                {subTitle && <div className={'numberInfoSubTitle'}>{subTitle}</div>}
                <div className={'numberInfoValue'} style={gap ? { marginTop: gap } : null}>
                    <span>
                        {total}
                        {suffix && <em className={'suffix'}>{suffix}</em>}
                    </span>
                    {(status || subTotal) && (
                        <span className={'subTotal'}>
                            {subTotal}
                            {status && <Icon type={`caret-${status}`} />}
                        </span>
                    )}
                </div>
            </div>
        )
    }
}

export default NumberInfo;

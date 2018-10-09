import * as React from 'react';
import { Icon } from 'antd';
import './index.less';

export interface IResultProps {
    type: 'success' | 'error';
    title: React.ReactNode;
    description?: React.ReactNode;
    extra?: React.ReactNode;
    actions?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string
}
class Result extends React.Component<IResultProps, any> {
    public render() {
        const { className, type, title, description, extra, actions, ...restProps} = this.props;
        const iconMap = {
            error: <Icon className={'error'} type="close-circle" />,
            success: <Icon className={'success'} type="check-circle" />,
        };
        return (
            <div className={`result ${className}`} {...restProps}>
                <div className={'icon'}>{iconMap[type]}</div>
                <div className={'title'}>{title}</div>
                {description && <div className={'description'}>{description}</div>}
                {extra && <div className={'extra'}>{extra}</div>}
                {actions && <div className={'actions'}>{actions}</div>}
            </div>
        );
    }
}

export default Result;

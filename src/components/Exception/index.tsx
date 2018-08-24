import * as React from 'react';
import { Button } from 'antd';
import config from './typeConfig';
import './index.less';

export  interface IExceptionProps{
    className?: string,
    linkElement?: any,
    type?: '403' | '404' | '500';
    title?: React.ReactNode;
    desc?: React.ReactNode;
    img?: string,
    actions?: React.ReactNode;
    rest?: object,
    style?: React.CSSProperties;
}

class Exception extends React.Component<IExceptionProps> {
    public render() {
        const { className, linkElement = 'a', type, title, desc, img, actions, ...rest } = this.props;
        const pageType = type in config ? type : '404';
        return (
            <div className={`exception ${className}`} {...rest}>
                <div className={'imgBlock'}>
                    <div
                        className={'imgEle'}
                        style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                    />
                </div>
                <div className={'content'}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={'desc'}>{desc || config[pageType].desc}</div>
                    <div className={'actions'}>
                        {actions ||
                            React.createElement(
                                linkElement,
                                {
                                    to: '/',
                                    href: '/',
                                },
                                <Button type="primary">返回首页</Button>
                            )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Exception;

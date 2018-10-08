import * as React from 'react';
import './index.less';

export default class FooterToolbar extends React.Component<{className?:string, extra?:React.ReactNode, style?: React.CSSProperties;}> {
    public render() {
        const { children, className, extra, ...restProps } = this.props;
        return (
            <div className={`${className} toolbar`} {...restProps}>
                <div className={'left'}>{extra}</div>
                <div className={'right'}>{children}</div>
            </div>
        );
    }
}

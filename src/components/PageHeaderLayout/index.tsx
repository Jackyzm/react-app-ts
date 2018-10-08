import * as React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../PageHeader';
import './PageHeaderLayout.less';

export interface IPageHeaderLayoutProps {
    children?: React.ReactNode | string,
    wrapperClassName?: string,
    top?: React.ReactNode | string,
    content?: any,
    extraContent?: any,
    title?:string,
    tabActiveKey?: string
}
class PageHeaderLayout extends React.Component<IPageHeaderLayoutProps> {
    public render() {
        const { children, wrapperClassName, top, content, extraContent } = this.props;
        return (
            <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
                {top}
                <PageHeader key="pageheader" content={content} {...this.props} extraContent={extraContent} linkElement={Link} />
                {children ? <div className={'content'}>{children}</div> : null}
            </div>
        )
    }
}

export default PageHeaderLayout;

import * as React from 'react';
import { Row } from 'antd';
import './index.less';
import Description from './Description';

export interface IDescriptionListProps {
    className?: string,
    layout?: 'horizontal' | 'vertical';
    col?: number | string;
    title?: React.ReactNode;
    gutter?: number;
    size?: 'large' | 'small';
    style?: React.CSSProperties;
}

class DescriptionList extends React.Component<IDescriptionListProps> {
    public static Description: typeof Description;
    public render() {
        const { className, title, col = 3, layout = 'horizontal', gutter = 32, children, size, ...restProps } = this.props;
        const clsString = `descriptionList ${layout} ${className} ${size === 'small'? 'small':''} ${size === 'large'? 'large':''}`;
        const column = col > 4 ? 4 : col;
        return(
            <div className={clsString} {...restProps}>
                {title ? <div className={'title'}>{title}</div> : null}
                <Row gutter={gutter}>
                    {React.Children.map(children, (child:React.ReactElement<{column?}>) => child ? React.cloneElement(child, { column }) : child)}
                </Row>
            </div>
        )
    }
}

export default DescriptionList;

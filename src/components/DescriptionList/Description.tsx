import * as React from 'react';
import { Col } from 'antd';
import './index.less';
import responsive from './responsive';

const Description = (props:{term?, column?, className?, children}) => {
    const { term, column, className, children, ...restProps } = props;
    return (
        <Col className={`description ${className}`} {...responsive[column]} {...restProps}>
            {term && <div className={'term'}>{term}</div>}
            {children && <div className={'detail'}>{children}</div>}
        </Col>
    );
};

// Description.defaultProps = {
//     term: '',
// };

// Description.propTypes = {
//     term: PropTypes.node,
// };

export default Description;

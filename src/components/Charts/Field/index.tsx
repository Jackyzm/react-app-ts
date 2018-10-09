import * as React from 'react';

import './index.less';

const Field = ({ label, value, ...rest }) => (
    <div className={'field'} {...rest}>
        <span>{label}</span>
        <span>{value}</span>
    </div>
);

export default Field;

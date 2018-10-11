import * as React from 'react';
import './index.less';

const GlobalFooter = (props:{className?, links, copyright}) => {
    const { className, links, copyright } = props;
    return (
        <div className={`globalFooter ${className}`}>
            {links && (
                <div className={'links'}>
                    {links.map(link => (
                        <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
                            {link.title}
                        </a>
                    ))}
                </div>
            )}
            {copyright && <div className={'copyright'}>{copyright}</div>}
        </div>
    );
};

export default GlobalFooter;

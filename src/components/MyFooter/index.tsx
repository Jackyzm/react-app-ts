import React from 'react';
import { Icon } from 'antd';
import './index.less';

/**
 * @class MyMenu
 */
class Footer extends React.Component<{}, {}> {
    private links: Array<object | null>
    /**
     * @param {*} props
     * @memberof Footer
     */
    constructor(props) {
        super(props);
        this.links = [
            {
                key: '大佬们',
                title: '大佬们',
                href: 'https://github.com/Jackyzm/react-app-ts',
            },
            {
                key: 'github',
                title: <Icon type="github" />,
                href: 'https://github.com/Jackyzm/react-app-ts',
            },
            {
                key: '点个星吧',
                title: '点个星吧',
                href: 'https://github.com/Jackyzm/react-app-ts',
            },
        ]
    }
    public render() {
        return (
            <div className={'globalFooter'}>
                <div className={'links'}>
                    {this.links.map( (link:{key: string, href: string, title: string | JSX.Element}) => (
                        <a key={link.key} target={'_blank'} href={link.href}>
                            {link.title}
                        </a>
                    ))}
                </div>
                <div className={'copyright'}> Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品 </div>
            </div>
        );
    }
};

export default Footer;

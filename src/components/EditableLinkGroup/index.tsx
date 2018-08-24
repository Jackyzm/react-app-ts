import * as React from 'react';
import { Button } from 'antd';
import './index.less';


export interface IEditableLinkGroup {
    links?: any,
    onAdd: ()=>void,
    linkElement?: string,
}
// TODO: 添加逻辑

class EditableLinkGroup extends React.PureComponent<IEditableLinkGroup> {

    // static propTypes = {
    //     links: PropTypes.array,
    //     onAdd: PropTypes.func,
    //     linkElement: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    // };

    public render() {
        const { links, linkElement='a', onAdd } = this.props;
        return (
            <div className={'linkGroup'}>
                {links.map(link =>
                    React.createElement(
                        linkElement,
                        {
                            key: `linkGroup-item-${link.id || link.title}`,
                            to: link.href,
                            href: link.href,
                        },
                        link.title
                    )
                )}
                {
                    <Button size="small" type="primary" ghost={true} onClick={onAdd} icon="plus">
                        添加
                    </Button>
                }
            </div>
        );
    }
}

export default EditableLinkGroup;

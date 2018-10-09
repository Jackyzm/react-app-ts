import * as React from 'react';
import { Tooltip, Avatar } from 'antd';

import './index.less';
class AvatarList extends React.Component<{size?: 'large' | 'small' | 'mini' | 'default', style?: React.CSSProperties;}> {
    public static Item: typeof Item;
    public render() {
        const { children, size, ...other } = this.props;

        const childrenWithProps = React.Children.map(children, (child:React.ReactElement<{size?}>)=>
            React.cloneElement(child, {
                size,
            })
        );
        return(
            <div {...other} className={'avatarList'}>
                <ul> {childrenWithProps} </ul>
            </div>
        )
    }
}

const Item = (props:{src, size?, tips, onClick?}) => {
    const { src, size, tips, onClick } = props;
    const cls = `avatarItem ${size === 'large'? 'avatarItemLarge': ''} ${size === 'small'? 'avatarItemSmall': ''} ${size === 'mini'? 'avatarItemMini': ''}`;
    return (
        <li className={cls} onClick={onClick}>
            {tips ? (
                <Tooltip title={tips}>
                    <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
                </Tooltip>
            ) : (
                    <Avatar src={src} size={size} />
                )}
        </li>
    );
};

AvatarList.Item = Item;

export default AvatarList;

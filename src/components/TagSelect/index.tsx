import * as React from 'react';
import { Tag, Icon } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

import './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = (props:{children, checked?, onChange?, value }) => {

    const { children, checked, onChange, value } = props;
    return (
        <CheckableTag checked={checked} key={value} onChange={state => onChange(value, state)}>
            {children}
        </CheckableTag>
    )
}

// TagSelectOption.isTagSelectOption = true;

export interface ITagSelectProps {
    onChange?: (value: string[]) => void;
    expandable?: boolean;
    value?: string[] | number[];
    style?: React.CSSProperties;
    defaultValue?,
    className?: string
}

class TagSelect extends React.Component<ITagSelectProps, {expand, value}> {
    public static Option: typeof TagSelectOption;
    constructor(props) {
        super(props);
        this.state={
            expand: false,
            value: this.props.value || this.props.defaultValue || [],
        }
    }
    public componentWillReceiveProps(nextProps) {
        if ('value' in nextProps && nextProps.value) {
            this.setState({ value: nextProps.value });
        }
    }

    public onChange = value => {
        const { onChange } = this.props;
        if (!('value' in this.props)) {
            this.setState({ value });
        }
        if (onChange) {
            onChange(value);
        }
    };

    public onSelectAll = checked => {
        let checkedTags = [];
        if (checked) {
            checkedTags = this.getAllTags();
        }
        this.onChange(checkedTags);
    };

    public getAllTags() {
        const { children } = this.props;
        const childrenArr = React.Children.toArray(cloneDeep(children));
        const checkedTags = childrenArr
            .filter(child => this.isTagSelectOption(child))
            .map((child:React.ReactElement<{value}>) => child.props.value);
        return checkedTags || [];
    }

    private handleTagChange = (value, checked) => {
        const checkedTags = [...this.state.value];

        const index = checkedTags.indexOf(value);
        if (checked && index === -1) {
            checkedTags.push(value);
        } else if (!checked && index > -1) {
            checkedTags.splice(index, 1);
        }
        this.onChange(checkedTags);
    };

    private handleExpand = () => {
        this.setState({
            expand: !this.state.expand,
        });
    };

    public isTagSelectOption = node => {
        return true;
        // return (
        //     node &&
        //     node.type &&
        //     (node.type.isTagSelectOption || node.type.displayName === 'TagSelectOption')
        // );
    };

     public render() {
        const { value, expand } = this.state;
        const { children, className, style, expandable } = this.props;

        const checkedAll = this.getAllTags().length === value.length;

        const cls = `tagSelect ${className} ${expandable? 'hasExpandTag' : ''} ${expand? 'expanded' : ''}`;
        return (
            <div className={cls} style={style}>
                <CheckableTag checked={checkedAll} key="tag-select-__all__" onChange={this.onSelectAll}>
                    全部
                </CheckableTag>
                {value &&
                    React.Children.map(children, (child:React.ReactElement<{value?, checked?, onChange}>) => {
                        if (this.isTagSelectOption(child)) {
                            return React.cloneElement(child, {
                                key: `tag-select-${child.props.value}`,
                                value: child.props.value,
                                checked: value.indexOf(child.props.value) > -1,
                                onChange: this.handleTagChange,
                            });
                        }
                        return child;
                    })}
                {expandable && (
                    <a className={'trigger'} onClick={this.handleExpand}>
                        {expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
                    </a>
                )}
            </div>
        );
    }
}

TagSelect.Option = TagSelectOption;

export default TagSelect;

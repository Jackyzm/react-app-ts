import React, { PureComponent } from 'react';
import { Input, Icon, AutoComplete } from 'antd';
import './index.less';

export interface IHeaderSearchProps {
    defaultOpen: boolean,
    onPressEnter: (value:string)=>void,
    onChange?: ()=>void,
    placeholder: string,
    dataSource?: string[],
    onSearch?: (value: string) => void,
    style?: React.CSSProperties,
    className?: string,
}

class HeaderSearch extends PureComponent<IHeaderSearchProps, {searchMode: boolean, value: string}> {
    // static defaultProps = {
    //     defaultActiveFirstOption: false,
    //     onPressEnter: () => { },
    //     onSearch: () => { },
    //     className: '',
    //     placeholder: '',
    //     dataSource: [],
    //     defaultOpen: false,
    // };
    //   static propTypes = {
    //     className: PropTypes.string,
    //     placeholder: PropTypes.string,
    //     onSearch: PropTypes.func,
    //     onPressEnter: PropTypes.func,
    //     defaultActiveFirstOption: PropTypes.bool,
    //     dataSource: PropTypes.array,
    //     defaultOpen: PropTypes.bool,
    //   };
    private timeout;
    private input;
    constructor(props) {
        super(props);
        this.state = {
            searchMode: this.props.defaultOpen,
            value: '',
        }
    }
    public componentWillUnmount() {
        clearTimeout(this.timeout);
    }
    private onKeyDown = e => {
        if (e.key === 'Enter') {
            this.timeout = setTimeout(() => {
                this.props.onPressEnter(this.state.value); // Fix duplicate onPressEnter
            }, 0);
        }
    };
    private onChange = value => {
        this.setState({ value });
        if (this.props.onChange) {
            this.props.onChange();
        }
    };
    private enterSearchMode = () => {
        this.setState({ searchMode: true }, () => {
            if (this.state.searchMode) {
                this.input.focus();
            }
        });
    };
    private leaveSearchMode = () => {
        this.setState({
            searchMode: false,
            value: '',
        });
    };
    public render() {
        const { placeholder, ...restProps } = this.props;
        // delete restProps.defaultOpen; // for rc-select not affected
        return (
            <span className={'headerSearch'} onClick={this.enterSearchMode}>
                <Icon type="search" key="Icon" />
                <AutoComplete
                    key="AutoComplete"
                    {...restProps}
                    className={this.state.searchMode ? 'input show': 'input'}
                    value={this.state.value}
                    onChange={this.onChange}
                >
                    <Input
                        placeholder={placeholder}
                        ref={node => {
                            this.input = node;
                        }}
                        onKeyDown={this.onKeyDown}
                        onBlur={this.leaveSearchMode}
                    />
                </AutoComplete>
            </span>
        );
    }
}

export default HeaderSearch;

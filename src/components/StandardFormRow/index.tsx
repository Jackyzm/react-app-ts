import * as React from 'react';
import './index.less';

export interface IStandardFormRowProps {
    title: string,
    last?: boolean,
    block?: boolean,
    grid?: boolean,
    style?: React.CSSProperties;
}

class StandardFormRow extends React.Component<IStandardFormRowProps> {
    public render() {
        const { title, children, last, block, grid, ...rest } = this.props;
        const cls = `standardFormRow ${block? 'standardFormRowBlock' : ''} ${last? 'standardFormRowLast' : ''} ${grid? 'standardFormRowGrid' : ''}`
        return(
            <div className={cls} {...rest}>
                {title && (
                    <div className={'label'}>
                        <span>{title}</span>
                    </div>
                )}
                <div className={'content'}>{children}</div>
            </div>
        )
    }
}

// const StandardFormRow = ({ title, children, last, block, grid, ...rest }) => {
//     // const cls = classNames(styles.standardFormRow, {
//     //     [styles.standardFormRowBlock]: block,
//     //     [styles.standardFormRowLast]: last,
//     //     [styles.standardFormRowGrid]: grid,
//     // });
//     const cls = `standardFormRow ${block? 'standardFormRowBlock' : ''} ${last? 'standardFormRowLast' : ''} ${grid? 'standardFormRowGrid' : ''}`
//     return (
//         <div className={cls} {...rest}>
//             {title && (
//                 <div className={'label'}>
//                     <span>{title}</span>
//                 </div>
//             )}
//             <div className={'content'}>{children}</div>
//         </div>
//     );
// };

export default StandardFormRow;

import * as React from 'react';


export interface ICountDownProps {
    format?: (time: number) => void;
    target: Date | number;
    onEnd?: () => void;
    style?: React.CSSProperties;
}


function fixedZero(val) {
    return val * 1 < 10 ? `0${val}` : val;
}

class CountDown extends React.Component<ICountDownProps, {lastTime}> {
    constructor(props) {
        super(props);

        const { lastTime } = this.initTime(props);

        this.state = {
            lastTime,
        };
    }

    public componentDidMount() {
        this.tick();
    }

    public componentWillReceiveProps(nextProps) {
        if (this.props.target !== nextProps.target) {
            clearTimeout(this.timer);
            const { lastTime } = this.initTime(nextProps);
            this.setState(
                {
                    lastTime,
                },
                () => {
                    this.tick();
                }
            );
        }
    }

    public componentWillUnmount() {
        clearTimeout(this.timer);
    }

    private timer:any = 0;
    private interval = 1000;
    private initTime = props => {
        let lastTime = 0;
        let targetTime = 0;
        try {
            if (Object.prototype.toString.call(props.target) === '[object Date]') {
                targetTime = props.target.getTime();
            } else {
                targetTime = new Date(props.target).getTime();
            }
        } catch (e) {
            throw new Error('invalid target prop');
        }

        lastTime = targetTime - new Date().getTime();
        return {
            lastTime: lastTime < 0 ? 0 : lastTime,
        };
    };
    // defaultFormat = time => (
    //  <span>{moment(time).format('hh:mm:ss')}</span>
    // );
    private defaultFormat = time => {
        const hours = 60 * 60 * 1000;
        const minutes = 60 * 1000;

        const h = Math.floor(time / hours);
        const m = Math.floor((time - h * hours) / minutes);
        const s = Math.floor((time - h * hours - m * minutes) / 1000);
        return (
            <span>
                {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
            </span>
        );
    };
    private tick = () => {
        const { onEnd } = this.props;
        let { lastTime } = this.state;

        this.timer = setTimeout(() => {
            if (lastTime < this.interval) {
                clearTimeout(this.timer);
                this.setState( { lastTime: 0 }, () => { if (onEnd) { onEnd()} });
            } else {
                lastTime -= this.interval;
                this.setState({ lastTime }, () => { this.tick() } );
            }
        }, this.interval);
    };

    public render() {
        const { format, onEnd, ...rest } = this.props;
        const { lastTime } = this.state;
        let result;
        if (format) {
            result = format(lastTime);
        } else {
            result = this.defaultFormat(lastTime);
        }

        return <span {...rest}>{result}</span>;
    }
}

export default CountDown;

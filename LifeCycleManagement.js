import React from 'react';
import ReactDOM from 'react-dom';

class LifeCyclesWrapper extends React.Component {
    constructor() {
        super(); // needed to use 'this'
    }
    mount() {
        ReactDOM.render(<LifeCycles increasing='true' />, document.getElementById('a'));
    }
    unmount() {
        ReactDOM.unmountComponentAtNode(document.getElementById('a'));
    }
    render() {
        return (
            <div>
                life cycle methods
                <br />
                <button onClick={this.mount.bind(this)}>Mount</button>
                <button onClick={this.unmount.bind(this)}>Unmount</button>
                <div id='a'></div>
                <hr />
                new props methods
                <div id='newprops'><NewProps val={42} /></div>
                <hr />
            </div>
        );
    }
}

class LifeCycles extends React.Component {
    constructor() {
        super();
        this.state = { val: 0 };
        this.update = this.update.bind(this);
    }
    update() {
        this.setState({ val: this.state.val + 1 });
    }
    componentWillMount() {
        // when element is fully prepped and guaranteed to make it into DOM
        // no access to the dom, but access to state
        console.log('mounting');
        this.setState({multiplier: 2});
    }
    render() {
        // called on every change of the state
        console.log('rendering!');
        return (
            <button onClick={this.update}>
                {this.state.val * this.state.multiplier}
            </button>
        );
    }
    componentDidMount() {
        // after the element has been placed into the DOM
        // so we've finally got access to the dom
        console.log('mounted');
        console.log(ReactDOM.findDOMNode(this));
        this.inc = setInterval(this.update, 500);
    }
    componentWillUnmount() {
        // when we are aout to remove our component from DOM
        // used for cleanup
        console.log('bye!');
        clearInterval(this.inc);
    }
}

class NewProps extends React.Component {
    constructor() {
        super();
        this.update = this.update.bind(this);
        this.state = { increasing: false };
    }
    update() {
        ReactDOM.render(
            <NewProps val={this.props.val + 1} />,
            document.getElementById('newprops')
        );
    }
    componentWillReceiveProps(nextProps) {
        this.setState({increasing: nextProps.increasing > this.props.val});
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.val % 5 === 0;
    }
    render() {
        console.log(this.state.increasing);
        return (
            <button onClick={this.update}>
                {this.props.val}
            </button>
        );
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps);
    }
}

export default LifeCyclesWrapper;

import React from 'react';
import ReactDOM from 'react-dom';
import LifeCyclesWrapper from './LifeCycleManagement';
import HigherOrder from './HigherOrderComponents';
import RenderFromArray from './RenderFromArray';
import LiveCompiler from './LiveCompiler';

// class - can have state
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            txt: 'this is some initial state',
            red: 0,
            green: 0,
            blue: 0
        }
        // binds not needed when using React.createClass
        // needed when using ES6/ES7 classes
        this.update = this.update.bind(this);
    }
    update(e) {
        this.setState({
            txt: e.target.value,
            red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value,
            green: ReactDOM.findDOMNode(this.refs.green.refs.inp).value,
            blue: ReactDOM.findDOMNode(this.refs.blue.refs.inp).value
        });
    }
    render() {
        return (
            <div>
                <Widget update={this.update}>{this.state.txt}</Widget>
                <hr />
                <NumInput ref='red' label='red' value={+this.state.red} max={255} update={this.update} />
                {this.state.red}
                <NumInput ref='green' label='green' value={+this.state.green} max={255} update={this.update} />
                {this.state.green}
                <NumInput ref='blue' label='blue' value={+this.state.blue} max={255} update={this.update} />
                {this.state.blue}
                <hr />
                <LifeCyclesWrapper />
                <HigherOrder />
                <RenderFromArray />
                <LiveCompiler />
            </div>
        );
    }
}

App.propTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
    txt: 'default text'
}

// function - stateless
const Widget = ({update, children}) => (
    <div>
        <input type="text"
            onChange={update} />
        <h1>{children}</h1>
    </div>
);

class NumInput extends React.Component {
    render() {
        let {update, value, label, ...props} = this.props;
        let labelHtml = label !== '' ? <label>{label}</label> : '';

        return (
            <div>
                <input ref='inp'
                    defaultValue={value}
                    onChange={update}
                    {...props} />
                {labelHtml}
            </div>
        );
    }
}

NumInput.propTypes = {
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number,
    value: React.PropTypes.number,
    label: React.PropTypes.string,
    update: React.PropTypes.func.isRequired,
    type: React.PropTypes.oneOf(['number', 'range'])
}

NumInput.defaultProps = {
    min: 0,
    max: 1,
    step: 1,
    value: 0,
    label: '',
    type: 'range'
}

export default App;

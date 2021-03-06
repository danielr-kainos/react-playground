import React from 'react';

let Mixin = InnerComponent => class extends React.Component {
    constructor() {
        super();
        this.update = this.update.bind(this);
        this.state = { val: 0 };
    }
    update() {
        this.setState({ val: this.state.val + 1 });
    }
    componentWillMount() {
        console.log('will mount');
    }
    render() {
        return <InnerComponent 
                    update={this.update}
                    {...this.state}
                    {...this.props} />
    }
    componentDidMount() {
        console.log('mounted');
    }
}

const Button = (props) => <button
                            onClick={props.update}>
                            {props.txt} - {props.val}
                        </button>

const Label = (props) => <label
                            onMouseMove={props.update}>
                            {props.txt} - {props.val}
                        </label>

let ButtonMixed = Mixin(Button)
let LabelMixed = Mixin(Label)

class HigherOrder extends React.Component {
    render() {
        return (
            <div>
                higher order components
                <br />
                <ButtonMixed txt='Button' />
                <LabelMixed txt='Label' />
                <hr />
            </div>
        );
    }
}

export default HigherOrder;

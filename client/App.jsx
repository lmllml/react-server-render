import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';

const {
    Component
} = React;

export default class App extends Component {
    constructor (props) {
        super(props);
        console.log('constructor');
        this.state = {
            text: 'constructor',
            text1: 'init',
            text2: 'init',
            text3: 'init'
        };
    }

    componentWillMount () {
        console.log('componentWillMount');
        this.setState({
            text1: 'componentWillMount'
        });
    }

    componentDidMount () {
        console.log('componentDidMount');
        this.setState({
           text2: 'componentDidMount'
        });
        this._fetchUser();
    }

    _fetchUser () {
        fetch('/users/1')
            .then((res) => res.json())
            .then((res) => {
                this.setState({
                   text3: res.name
                });
            });
    }

    render () {
        return (
            <div>
                <div>
                    <div>{this.state.text}</div>
                    <div>{this.state.text1}</div>
                    <div>{this.state.text2}</div>
                    <div>{this.state.text3}</div>
                </div>
                <script src="/bundle.js"></script>
            </div>
        );
    }
}

if (typeof window !== 'undefined') {
    ReactDOM.render(React.createElement(App), document.getElementById('app'));
}

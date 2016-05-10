import React from 'react';

const {
    Component
} = React;


export default class Layout extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <html>
            <head>

            </head>
            <body>
                <div id="app" dangerouslySetInnerHTML={{__html: this.props.html}}>
                </div>
            </body>
            </html>
        )
    }
}

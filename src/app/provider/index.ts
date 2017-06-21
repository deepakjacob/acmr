import * as React from "react";

export default class Provider extends React.Component<any, any> {
    static childContextTypes = {
        store: React.PropTypes.object.isRequired
    }

    getChildContext() {
        return { store: this.props.store };
    }

    render() {
        return React.createElement(this.props.target);
    }
}
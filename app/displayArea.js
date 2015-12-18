import React from "react";

export default React.createClass({
    render: function() {
        return (
            <div className="displayArea">
                <pre>{JSON.stringify(this.props.input, null, 2) }</pre>
            </div>
        );
    }
});
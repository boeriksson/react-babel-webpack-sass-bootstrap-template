import React from "react";
import SelectAddress from "./selectAddress";
import DisplayArea from "./displayArea";
import $ from "jquery";

var urlBase = "http://localhost:9300/route/distance_duration";

export default React.createClass({
    getInitialState: function () {
        return {
            fromAddress: '',
            fromAddressDisplay: '',
            toAddress: '',
            toAddressDisplay: '',
            route: ''
        };
    },
    showFromAddress: function (address) {
        this.setState({fromAddressDisplay: address});
    },
    selectFromAddress: function (address) {
        this.setState({fromAddressDisplay: address});
        this.setState({fromAddress: address});
    },
    showToAddress: function (address) {
        this.setState({toAddressDisplay: address});
    },
    selectToAddress: function (address) {
        this.setState({toAddressDisplay: address});
        this.setState({toAddress: address});
    },
    calculateRoute: function () {
        var self = this;
        ///route/distance_duration?origin={origin}&destination={destination}&language={language}&departureTime={departureTime}"
        var routeUrl = urlBase +
            "?origin=" + getCoordinatesFromDetails(this.state.fromAddress) +
            "&destination=" + getCoordinatesFromDetails(this.state.toAddress) +
            "&language=sv";
        $.get(routeUrl, function (routeResult) {
            console.log(JSON.stringify(routeResult));
            self.setState({route: routeResult});
        });

        function getCoordinatesFromDetails(details) {
            return details.coordinate.lat + "," + details.coordinate.lng;
        }
    },

    render: function () {
        return (
            <div class="containerBody">
                <SelectAddress showAddress={this.showFromAddress.bind(this)}
                               selectAddress={this.selectFromAddress.bind(this)}/>
                <DisplayArea input={this.state.fromAddressDisplay}/>
                <SelectAddress showAddress={this.showToAddress.bind(this)}
                               selectAddress={this.selectToAddress.bind(this)}/>
                <DisplayArea input={this.state.toAddressDisplay}/>
                <button onClick={this.calculateRoute}>Calculate Route</button>
                <DisplayArea input={this.state.route}/>
            </div>
        );
    }
});
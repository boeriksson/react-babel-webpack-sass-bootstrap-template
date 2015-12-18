import React from "react";
import $ from "jquery";
import _ from "lodash";
import Autosuggest from "react-autosuggest";

var urlBase = "http://localhost:9200/address"; //={searchStr}&language={language}&closeToLocation={closeToLocation}""

function getSuggestions(input, callback) {
    $.get(urlBase + "/find?searchStr=" + input + "&language=sv", function (result) {
        console.log("Result: " + JSON.stringify(result));
        callback(null, result);
    });
}

export default React.createClass({
    render: function () {
        var self = this;
        return (React.createElement(Autosuggest, {
            suggestions: getSuggestions,
            inputAttributes: {
                placeholder: 'Address'
            },
            showWhen: function (input) {
                return input.trim().length >= 3;
            },
            suggestionRenderer: function (place, input) {
                console.log("suggestionRenderer suggestion: " + JSON.stringify(place) + " input: " + JSON.stringify(input));
                return (<span class="selectAddressResult">{place.description}</span>);
            },
            suggestionValue: function (place) {
                var detailsUrl = urlBase + "/get/" + place.placeId + "?language=sv";
                var that = this;
                $.get(detailsUrl, function (details) {
                    self.props.selectAddress(details);
                });
                return place.description;
            },
            onSuggestionFocused: function (place) {
                var detailsUrl = urlBase + "/get/" + place.placeId + "?language=sv";
                $.get(detailsUrl, function (details) {
                    self.props.showAddress(details);
                });
            }

        }));
    }
});
import React, { Component } from 'react';
import $ from 'jquery';
import config from './config/dev.js'
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from './custom-plotly.js'
const PlotlyComponent = createPlotlyComponent(Plotly);


export default class HistoricalTrend extends Component {

    _fetchData(dataSet, startDate, endDate) {
        let data = [];
        $.ajax({
            method: 'GET',
            async: false,
            url: `${config.datasetBaseUrl}/${config.databaseCode}/${dataSet}.json?api_key=${config.apiKey}&start_date=${startDate}&end_date=${endDate}`,
            success: (result) => {
                data = result.dataset.data;
            }
        });
        return data;
    }

    render() {
        let companyName = this.props.company;
        let startDate = this.props.startDate;
        let endDate = this.props.endDate;

        let historicalData = this._fetchData(companyName, startDate, endDate);
        if (historicalData.length !== 0) {
            var data = this._generateDataForViews(historicalData);
            var layout = {
                bargap: 0.05,
                bargroupgap: 0.2,
                barmode: "overlay",
                title: "Historical trend",
                xaxis: {title: "Open"},
                yaxis: {title: "Count"}
            };
            return <PlotlyComponent data={data} layout={layout}/>

        }else{
                alert("The data for the selected company and selected dates is not available or not accessible. " +
                    "Please select different search criteria.");
                return <div></div>
        }
    }

    _generateDataForViews(historicalData) {
        var open = [];
        var high = [];
        var low = [];
        var close = [];
        var x = [];
        historicalData.map(element => {
                x.push(new Date(element[0]));
                open.push(element[1]);
                high.push(element[2]);
                low.push(element[3]);
                close.push(element[4]);
            }
        );

        var trace1 = this._createTrace(x, open, "Open", "rgba(100, 200, 102, 0.7)");
        var trace2 = this._createTrace(x, high, "High", "rgba(150, 100, 190, 0.7)");
        var trace3 = this._createTrace(x, low, "Low", "rgba(100, 190, 167, 0.7)");
        var trace4 = this._createTrace(x, close, "Close", "rgba(170, 100, 102, 0.7)");
        var data = [trace1, trace2, trace3, trace4];
        return data;
    }
    _createTrace(x, y, name, c){
        return {
            x: x,
            y: y,

            marker: {
                color: c
            },
            name: name,
            type: "scatter",
            mode: "lines"

        };
    }
}
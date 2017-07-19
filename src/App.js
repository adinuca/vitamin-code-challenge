import React, { Component } from 'react';
import $ from 'jquery';
import './App.css';
import HistoricalTrend from "./HistoricalTrend.js";
import 'bootstrap/dist/css/bootstrap.css';
import config from './config/dev.js'

class App extends Component {
    componentWillMount() {
        this._fetchCompanies();
    }

    componentDidMount(){
        this.setState({
            showHistoryTrend: false,
            showFutureTrend: false
        });
    }

    _fetchCompanies() {
        $.ajax({
            method: 'GET',
            url: `${config.companiesBaseUrl}?database_code=${config.databaseCode}&filter=sample&api_key=${config.apiKey}`,
            success: (rawCompanies) => {
                let companies = rawCompanies.datasets.map(rawCompany => {
                        return {
                            key: rawCompany.dataset_code,
                            name: rawCompany.name
                        };
                    }
                );
                this.setState({companies});
            }
        });
    }

    constructor() {
        super();
        this.state = {
            companies: [],
            showHistoryTrend: false
        }
    }
    render() {
        let historicalTrend ;
        if(this.state.showHistoryTrend) {
            let dataSet = this._company.value;
            let startDate = this._startDate.value;
            let endDate = this._endDate.value;
            historicalTrend =
                <HistoricalTrend company={dataSet} startDate={startDate}
                                 endDate={endDate}/>
        }

        return (
            <div>
                <div className="row">
                    <form >
                        <div className="form-group">
                            <label  className="col-sm-2 control-label">Companies</label>
                            <select id="companiesSelect" className="form-control" ref={select => this._company = select}>
                                {this.state.companies.map(company =>
                                    <option key={company.key} value={company.key}>{company.name}</option>)
                                }
                            </select>
                            <br/>
                        </div>

                        <div className="form-group">
                            <label  className="col-sm-2 control-label">Start date</label>
                            <input type="date"   id="start-date" ref={input => this._startDate = input}/>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-2 control-label">End date</label>
                            <input type="date"  id="end-date" ref={input => this._endDate = input}/>
                        </div>
                        <div className="form-group">
                            <button className="btn-sm btn btn-default col-sm-2" onClick={this._handleOnClickOnHistoricalTrend.bind(this)}>Show historical trend</button>
                        </div>
                        <div className="form-group">
                            <button className="btn-sm btn btn-default col-sm-offset-1 col-sm-2" onClick={this._handleOnClickOnFutureTrend.bind(this)}>Show future trend</button>
                        </div>
                    </form>
                </div>
                <div className="row">
                    {historicalTrend}
                </div>
            </div>
        )
    }

    _handleOnClickOnHistoricalTrend(event) {
        event.preventDefault();
        this.setState({showFutureTrend:false});
        this.setState({showHistoryTrend:false});
        if (!this._company.value){
            alert("Please select company");
            return
        }
        this.setState({showHistoryTrend:true});
    }

    _handleOnClickOnFutureTrend(event) {
        alert("We are sorry, but this functionality is not supported yet.");
    }
}
export default App;

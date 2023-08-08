

import React from 'react';
import './plotly.css';
import Plot from 'react-plotly.js';
import { plotlyCharts } from './plotlyCharts';

const PlotlyComponent = (props) => {
    var responseData = plotlyCharts(props.divName, props.responseData, props.showLegend, props.currencySign, props.dataForAddLog);
    //console.log('responseDataresponseDataresponseDataresponseDataresponseDataresponseData',responseData)
    return (
        <div id='plotly-plotlycomponent'>
            <Plot
                data = {responseData.data}
                layout = {responseData.layout}
                // config={responseData.config_export}
                // frames={this.state.frames}
                // onInitialized={(figure) => this.setState(figure)}
                // onUpdate={(figure) => this.setState(figure)}
            />
        </div>
    );
};

export default PlotlyComponent;
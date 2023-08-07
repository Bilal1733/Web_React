export const plotlyData = (response) => {
    console.log('response',response)
    let data = [], layout = {}, configuration = {}, subplotsData = [], axisData = [];

    // VALIDATING FOR DATA 
    response.Charts.map((items, index) => {
        let xdata = 'x' + String(index);
        subplotsData = index === 0 ? [...subplotsData, 'xy'] : [...subplotsData, String(xdata) + String(index) + String('y')];
        axisData = index === 0 ? [...axisData, 'xaxis'] : [...axisData, 'xaxis' + String(index) + String(index)]
        data = [...data, {
            x: items.YAxisData,
            y: response.XAxisData,
            text: items.XAxisData,
            type: 'bar',
            orientation: 'h',
            marker: { "color": response.ColourList },
            textposition: 'outside',
            textfont: {
                family: "Open Sans, verdana, arial, sans-serif",
                size: 12,
                color: 'black'
            },
            xaxis: String(xdata) + String(index),
            yaxis: 'y'
        }]
    }) 


    //VALIDATING FOR LAYOUT
    layout = {
        title: 'For testing Purpose',
        grid: { rows: 2, columns: response?.Charts.length, subplots:[subplotsData]},
        yaxis: {
            // title: "this is yaxis title",
            automargin: true,
            ticksuffix: '%',
            tickprefix: '@'
        },
        margin: {
            pad: 10,
            l: 50,
            r: 50,
            b: 50,
            t: 50,
        },
        width: 1500,
        height: 500,
        showlegend: false,
        modebar: { remove: ["autoScale2d", "autoscale", "editInChartStudio", "editinchartstudio", "hoverCompareCartesian", "hovercompare", "lasso", "lasso2d", "orbitRotation", "orbitrotation", "pan", "pan2d", "pan3d", "reset", "resetCameraDefault3d", "resetCameraLastSave3d", "resetGeo", "resetSankeyGroup", "resetScale2d", "resetViewMapbox", "resetViews", "resetcameradefault", "resetcameralastsave", "resetsankeygroup", "resetscale", "resetview", "resetviews", "select", "select2d", "sendDataToCloud", "senddatatocloud", "tableRotation", "tablerotation", "toImage", "toggleHover", "toggleSpikelines", "togglehover", "togglespikelines", "toimage", "zoom", "zoom2d", "zoom3d", "zoomIn2d", "zoomInGeo", "zoomInMapbox", "zoomOut2d", "zoomOutGeo", "zoomOutMapbox", "zoomin", "zoomout"] }
    };

    
    
    axisData.map((item,index) => {
        let numberformatting = response.Charts[index]?.YNumberFormat === '%' || 'M'? 'ticksuffix' : 'tickprefix';
        console.log('numberformatting', numberformatting)
        layout = {...layout, [item]: {
            'title':response.Charts[index]?.YAxisLabel, 
            tickprefix: response.Charts[index]?.YNumberFormat === ('%' || 'M') ? '' :  response.Charts[index]?.YNumberFormat,
            ticksuffix: response.Charts[index]?.YNumberFormat === ('%' || 'M') ? response.Charts[index]?.YNumberFormat :  ''
        
        }}
    })

    return { data, layout, configuration }
}

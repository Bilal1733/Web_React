const getExportConfig = (divName, dataForAddLog) => {
    var exoprtIcon = {
        'width': 400,
        'height': 500,
        'path': 'M369.9 97.9L286 14C277 5 264.8-.1 252.1-.1H48C21.5 0 0 21.5 0 48v416c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V131.9c0-12.7-5.1-25-14.1-34zM332.1 128H256V51.9l76.1 76.1zM48 464V48h160v104c0 13.3 10.7 24 24 24h104v288H48zm212-240h-28.8c-4.4 0-8.4 2.4-10.5 6.3-18 33.1-22.2 42.4-28.6 57.7-13.9-29.1-6.9-17.3-28.6-57.7-2.1-3.9-6.2-6.3-10.6-6.3H124c-9.3 0-15 10-10.4 18l46.3 78-46.3 78c-4.7 8 1.1 18 10.4 18h28.9c4.4 0 8.4-2.4 10.5-6.3 21.7-40 23-45 28.6-57.7 14.9 30.2 5.9 15.9 28.6 57.7 2.1 3.9 6.2 6.3 10.6 6.3H260c9.3 0 15-10 10.4-18L224 320c.7-1.1 30.3-50.5 46.3-78 4.7-8-1.1-18-10.3-18z'
    };

    var config_export = {
       displayModeBar: false,
        modeBarButtonsToAdd: [
            {
                name: 'Export Data',
                icon: exoprtIcon,
                click: function (gd) {
                    if (typeof (dataForAddLog) !== 'undefined') {
                        dataForAddLog.auditName = 9;
                        // addLogEntry(dataForAddLog);
                    }                   
                    // var temp_data = getJsonfromChart($('#' + divName)[0]);
                    var temp_data = getJsonfromChart(document.querySelector(divName));

                    JSONToCSVConvertor(temp_data, divName, true);
                }
            }
        ],
        
    };

    return config_export;
}

const getJsonfromChart = (chartObject) => {
    var resultList = [];
    var data = chartObject.data;
    var layout = chartObject.layout;
    switch (data[0].type) {
        case "line":
        case "scatter":
        case "lines+markers":
            var xaxisTitle = layout.xaxis.title.text;
            var elements = [];

            for (var i = 0; i < data.length; i++) {
                elements.push.apply(elements, [...new Set([...data[i].x])]);
            }
            elements = [...new Set(elements)]

            elements.forEach(element => {
                entry = {};
                if (xaxisTitle.toLowerCase() == 'date') {
                    entry[xaxisTitle] = getDateFormat(element);
                }
                else {
                    entry[xaxisTitle] = element;
                }
                for (var i = 0; i < data.length; i++) {
                    if (data[i].y.length == 0)
                        continue;
                    var position = data[i].x.indexOf(element);
                    var trendName = data[i].name;
                    if (typeof (trendName) == "undefined")
                        trendName = layout.yaxis.title.text;
                    if (chartObject.id == "valuationAnalysisChart") {
                        trendName = data[i].name + " - " + layout.yaxis.title.text;
                    }
                    if (position > -1) {
                        ticksuffix = '';
                        yaxis = 'yaxis'.concat(i == 0 ? '' : i + 1);
                        if (yaxis in layout) {
                            ticksuffix = layout[yaxis].ticksuffix;
                        }
                        else if ('yaxis' in layout)
                            ticksuffix = layout['yaxis'].ticksuffix;
                        entry[trendName] = data[i].y[position] * getTickSufixMultplier(ticksuffix);
                    }
                    else {
                        entry[trendName] = '';
                    }

                }
                resultList.push(entry);

            });
            return JSON.stringify(resultList);
            break;
        case "bar":
            var elements = [];
            if ('textposition' in data[0]) { //sub plots
                if ('grid' in layout) {
                    for (var row = 0; row < layout.grid.rows; row++) {
                        var firstPositionInRow = (row - 1 + layout.grid.columns) * row;
                        var xaxis = 'xaxis'.concat(row == 0 ? '' : row + 1);
                        var yaxis = 'yaxis'.concat(row == 0 ? '' : row + layout.grid.columns);
                        if (data.length > firstPositionInRow) {
                            for (var i = data[firstPositionInRow].x.length - 1; i >= 0; i--) {
                                var entry = {};
                                if (layout[yaxis].title.text !="Dollar") {
                                    entry = { 'Subplot': layout[yaxis].title.text != null ? layout[yaxis].title.text.replace(/<[^>]*>?/gm, ' ') : '' };
                                }                                
                                entry['Element'] = data[firstPositionInRow].y[i];
                                for (var j = firstPositionInRow; j < firstPositionInRow + layout.grid.columns; j++) {
                                    var xaxis = 'xaxis'.concat(j - firstPositionInRow == 0 ? '' : j - firstPositionInRow + 1);
                                    if (xaxis in layout) {
                                        var ticksuffix = layout[xaxis].ticksuffix;
                                        if (typeof (ticksuffix) == "undefined")
                                            ticksuffix = '';

                                        entry[layout[xaxis].title.text] = data[j].x[i] * getTickSufixMultplier(ticksuffix);
                                    }
                                }
                                resultList.push(entry);
                               
                            }
                        }
                    }
                }

                else if (layout['yaxis'].title.text == "Tactics") {                   
                    if (data.length > 0) {
                        yaxistitle = layout.yaxis.title.text;
                        for (var i = 0; i < data[0].y.length; i++) {
                            entry = {};
                            entry[yaxistitle] = data[0].y[i];
                            for (var j = 0; j < data.length; j++) {
                                entry[data[j].name] = data[j].x[i];
                            }
                            resultList.push(entry);
                        }
                       
                    }
                }
               
                else { //'simple' subplot
                    var xlength = data[0].x.length;
                    var ylength = data[0].y.length;
                    var loopLength = xlength >= ylength ? xlength : ylength;
                    for (var i = loopLength - 1; i >= 0; i--) {
                        var entry = { 'Element': data[0].y[i] };
                        for (var j = 0; j < data.length; j++) {
                            var xaxis = 'xaxis'.concat(j == 0 ? '' : j + 1);
                            if (xaxis in layout) {
                                var ticksuffix = layout[xaxis].ticksuffix;
                                if (typeof (ticksuffix) == "undefined")
                                    ticksuffix = '';
                                if (data[j].x[i]) {
                                    entry[layout[xaxis].title.text] = data[j].x[i] * getTickSufixMultplier(ticksuffix);
                                }
                                else {
                                    entry[layout[xaxis].title.text] = "null";
                                }
                            }
                        }
                        resultList.push(entry);
                    }
                }
            }
            else {
                xaxisTitle = layout.xaxis.title.text;
                var stacked = false;
                if ('barmode' in layout && layout['barmode'] == 'stack') {
                    stacked = true;
                }
                ticksuffix = '';
                if ('yaxis' in layout) {
                    ticksuffix = layout['yaxis'].ticksuffix;
                }
                if (stacked == true && data[0].orientation == "h") {
                    var yaxistitle = layout.yaxis.title.text;
                    for (var i = 0; i < data[0].y.length; i++) {
                        entry = {};
                        entry[yaxistitle] = data[0].y[i];
                        for (var j = 0; j < data.length; j++) {
                            entry[data[j].name] = data[j].x[i];
                        }
                        resultList.push(entry);
                    }
                }
                else {
                    for (var i = 0; i < data[0].y.length; i++) {
                        entry = {};
                        data.forEach(element => {
                            if (xaxisTitle.toLowerCase() == 'date') {
                                entry[xaxisTitle] = getDateFormat(('x' in element ? element.x[i] : layout.xaxis.ticktext[i] + '(' + layout.xaxis.tickvals[i] + ')'));
                            }
                            else {
                                entry[xaxisTitle] = ('x' in element ? element.x[i] : layout.xaxis.ticktext[i] + '(' + layout.xaxis.tickvals[i] + ')')
                            }
                            entry[element.name] = typeof (element.y[i]) == "string" ? element.y[i] : element.y[i] * getTickSufixMultplier(ticksuffix);
                        });
                        resultList.push(entry);
                    }
                }
            }
            return JSON.stringify(resultList);
           
            break;
    }
    
    return 1;
}

const JSONToCSVConvertor = (JSONData, ReportTitle, ShowLabel) => {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    //CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row += '"' + index + '",';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    //return false
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const getTickSufixMultplier = (tickSuffix) => {
    if (tickSuffix.toLowerCase() === 'm')
        return 1000000;
    if (tickSuffix.toLowerCase() === 'k')
        return 1000;
    if (tickSuffix === '%')
        return 1;
    return 1;

}

const getDateFormat = (d) => {

    let monthNames = ["Jan", "Feb", "Mar", "Apr",
        "May", "Jun", "Jul", "Aug",
        "Sep", "Oct", "Nov", "Dec"];

    var dateArray = d.split("/");
    if (dateArray.length === 3) {
        return dateArray[1] + "/" + monthNames[dateArray[0] - 1] + "/" + dateArray[2];
    }
    else {
        return d;
    }
}

//common event handler for formatting number as a thousand comma seperator numbers
const thousands_separators = (num) => {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
}

//common event handler for handling height of bar
const calculateBarHeight = (noOfBars,isLegendPresent=false) => {
    var totalHeight = 0;
    var xaxislabelHeight = 20;
    var xaxisunitheight = 20;
    var toppadding = 50;
    var gapbetweentoppaddingandchart = 12;
    var chartHeight = 0;
    var barHeight = 40;
    if (noOfBars >= 15 && noOfBars <= 20) {
        barHeight = 20;
    }
    else if (noOfBars >= 10 && noOfBars <= 14) {
        barHeight = 30;
    } else if (noOfBars >= 5 && noOfBars <= 9) {
        barHeight = 40;
    } else if (noOfBars >= 1 && noOfBars <= 4) {
        barHeight = 60;
    }
    chartHeight = barHeight * noOfBars;
    totalHeight = xaxislabelHeight + xaxisunitheight + toppadding + gapbetweentoppaddingandchart + chartHeight;
    if (isLegendPresent === true) {
        totalHeight = totalHeight + 50;
    }
    return totalHeight;
}

const numberformatFunction1 = (numberFormat) => {
    var numbeFormat = numberFormatdata(numberFormat);
    var format = ',.' + numbeFormat.decimal + 'f';
    var divideNumber = 1;
    if (numbeFormat.postfix === 'k' || numbeFormat.postfix === 'K') {
        divideNumber = 1000;
    }
    else if (numbeFormat.postfix === 'm' || numbeFormat.postfix === 'M') {
        divideNumber = 1000000;
    }
    else if (numbeFormat.postfix === '%' && (numberFormat.includes('P') || numberFormat.includes('p'))) {
        divideNumber = 0.01;
    }
    return {
        numbeFormat, format, divideNumber
    }
}

//common event handler for number format
var numberFormatdata = (format) => {
    var object = {
        prefix: '',
        postfix: '',
        decimal: 0,
        divideNumber:1
    };
    if (format) {
        if (format.includes('P') || format.includes('p')) {
            object.postfix = '%';
            if (format.includes('P')) {
                object.prefix = format.substring(0, format.indexOf('P'));
            }
            else if (format.includes('p')) {
                object.prefix = format.substring(0, format.indexOf('p'));
            }
            
        }
        else if (format.includes('N') || format.includes('n')) {
            object.postfix = '';
            if (format.substring(format.indexOf('D') + 1,(format.length)) != "") {
                object.postfix = format.substring(format.indexOf('D') + 1, (format.length));
            }
            if (format.includes('N')) {
                object.prefix = format.substring(0, format.indexOf('N'));
            }
            else if (format.includes('n')) {
                object.prefix = format.substring(0, format.indexOf('n'));
            }
        }
        var matches = format.match(/(\d+)/);

        if (matches) {
            object.decimal = matches[0];
        }
        if (object.postfix == 'k' || object.postfix == 'K') {
            object.divideNumber = 1000;
        }
        else if (object.postfix == 'm' || object.postfix == 'M' || object.postfix == "MM") {
            object.divideNumber = 1000000;
        }
        else if (object.postfix == '%'){
            object.divideNumber = 100;
        }
    }
    return object;
}





export const plotlyCharts = (divName, response, showLegend, currencySign, dataForAddLog) => {
    console.log("response",)
    //common function for plotlycharts using new formatted json
        if (response.Subplots.length !== 0) {
            var traces = [];
            var shapes = [];
            var annotations = [];
            var upperDomainRange = [], lowerDomainRange = '';
            var totalbarCountChart = 0;
            for (var k = 0; k < response.Subplots.length;k++) {
                for (var i = 0; i < response.Subplots[k].Charts.length; i++) {
                    var mode = '',type='',barmode='',orientation='';
                    //switch case for specifying chart type
                    var chartFeatures = response.Subplots[k].Charts[i].ChartType.split("/");
                    var _chartType = chartFeatures[0];
                    chartFeatures.shift();
                    switch (_chartType) {
                        case 'BubbleChart':
                            mode = 'markers';
                            break;
                        case 'LineChart-dots':
                            mode = 'lines+markers';
                            break;
                        case 'BarChart-Stack':
                            type= 'bar';
                            barmode= 'stack'
                            break;
                        case 'BarChart-Horizontal':
                            type = 'bar';
                            orientation = 'h';
                            if (response.Subplots[k].Charts[i].hasOwnProperty('Annotations')) {
                                annotations = response.Subplots[k].Charts[i].Annotations;
                            }                              
                            break;
                        case 'BarChart-Horizontal/Stack':
                            type = 'bar';
                            barmode = 'stack';
                            orientation = 'h';
                            break;
                    }
                    for (var fCount = 0; fCount < chartFeatures.length; fCount++) {
                        switch (chartFeatures[fCount]) {
                            case "Stack":

                                break;
                            case "Group":

                                break;
                            default:
                        }
                    }

                    for (var j = 0; j < response.Subplots[k].Charts[i].Series.length; j++) {
                        var numberFormat = numberformatFunction1(response.Subplots[k].Charts[i].Series[j].NumberFormat);
                        var valueAxisName = response.Subplots[k].Charts[i].Series[j].ValueAxisName;
                        var valueAxisArray = response.Subplots[k].ValueAxis.filter(a => a.Name == valueAxisName);
                        response.Subplots[k].Charts[i].Series[j].TooltipFormat = response.Subplots[k].Charts[i].Series[j].TooltipFormat.replace('{%NFPre%}', numberFormat.numbeFormat.prefix);
                        response.Subplots[k].Charts[i].Series[j].TooltipFormat = response.Subplots[k].Charts[i].Series[j].TooltipFormat.replace('{%NFPost%}', numberFormat.numbeFormat.postfix);
                        response.Subplots[k].Charts[i].Series[j].TooltipFormat = response.Subplots[k].Charts[i].Series[j].TooltipFormat.replace('{%NFF%}', numberFormat.format);
                        if (response.Subplots[k].Charts[i].Series[j].ChartType != null) {
                            var chartFeatures = response.Subplots[k].Charts[i].Series[j].ChartType.split("/");
                            var _chartType = chartFeatures[0];
                            chartFeatures.shift();
                            switch (_chartType) {
                                case 'BubbleChart':
                                    mode = 'markers';
                                    break;
                                case 'LineChart-dots':
                                    type = '';
                                    mode = 'lines+markers';
                                    break;
                                case 'BarChart-Stack':
                                    type = 'bar';
                                    barmode = 'stack'
                                    break;
                                case 'BarChart-Horizontal':
                                    type = 'bar';
                                    orientation = 'h';
                                    break;
                                case 'BarChart-Horizontal/Stack':
                                    type = 'bar';
                                    barmode = 'stack';
                                    orientation = 'h';

                            }
                        }
                        var template = response.Subplots[k].Charts[i].Series[j].TooltipFormat;
                        var trace = {
                            x: [],
                            y: [],
                            mode: mode,
                            type: type,
                            orientation: orientation,
                            marker: {
                                size: response.Subplots[k].Charts[i].ChartType === 'BubbleChart' ? 18:''
                            },
                            hovertemplate: template,
                        };
                        if (response.Subplots[k].Charts[i].Series[j].HoverText != null) {
                            trace.hovertext = response.Subplots[k].Charts[i].Series[j].HoverText.map(function (obj) {
                                if (obj !== '' && obj !== 'NA' && !obj.includes("/") && !isNaN(obj)) {
                                    return thousands_separators((numberFormat.numbeFormat.prefix + (obj / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix));
                                }
                                else {
                                    return obj;
                                }
                            });
                        }
                        var categoryAxisName = response.Subplots[k].Charts[i].Series[j].CategoryAxisName;
                        var categoryAxisArray = response.Subplots[k].CategoryAxis.filter(a => a.Name == categoryAxisName);
                        if (categoryAxisName.includes('y')) {
                            trace.text = response.Subplots[k].Charts[i].Series[j].Data.map(function (obj) {
                                if (obj !== null) {
                                    if (obj !== 9876543210123) {
                                        return thousands_separators((numberFormat.numbeFormat.prefix + (obj / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix));
                                    }
                                    else {
                                        return 'NA';
                                    }
                                }
                            });
                            trace.x = response.Subplots[k].Charts[i].Series[j].Data.map(function (obj) {
                                if (obj !== null) {
                                    return obj != 9876543210123 ? (obj / numberFormat.divideNumber) : 9876543210123
                                }
                                else {
                                    return null;
                                }
                            });
                            if (trace.x.indexOf(9876543210123) != -1) {
                                for (var u = 0; u < trace.x.length; u++) {
                                    if (trace.x[u] == 9876543210123) {
                                        var arr = trace.x.filter((x) => { return x != 9876543210123 });
                                        if (arr.length == 0) {
                                            arr.push(0);
                                        }
                                        trace.x[u] = Math.max.apply(null, arr);
                                    }
                                }
                            }
                            trace.y = categoryAxisArray[0].Data;
                            if (_chartType == 'BubbleChart') {
                                if (response.Subplots[k].Charts[i].Series.length <= 2 && response.Subplots[0].CategoryAxis[0].Data.length < 15) {
                                    trace.text = response.Subplots[k].Charts[i].Series[j].Data.map(function (obj) {
                                        if (obj != null) {
                                            if (obj != 9876543210123) {
                                                return thousands_separators((numberFormat.numbeFormat.prefix + (obj / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix));
                                            }
                                            else {
                                                return 'NA'
                                            }
                                        }
                                    });
                                    if (type == 'bar') {
                                        trace.textposition = 'outside';
                                    }
                                    trace.textposition = j % 2 == 1 ? 'top' : 'bottom';
                                    trace.mode = trace.mode + '+text';
                                    trace.cliponaxis = false;
                                }
                            }
                            else if (_chartType == 'BarChart-Horizontal') {
                                if (response.Subplots[k].Charts[i].Annotations != undefined && response.Subplots[k].Charts[i].hasOwnProperty('ErrorBars')) {
                                    if (response.Subplots[k].Charts[i].Annotations.length > 0 && response.Subplots[k].Charts[i].hasOwnProperty('ErrorBars')) {
                                        trace.error_x = {
                                            type: 'data',
                                            visible: true,
                                            symmetric: false,
                                            array: response.Subplots[k].Charts[i].ErrorBars.ArrayValue,
                                            arrayminus: response.Subplots[k].Charts[i].ErrorBars.ArrayMinusValue,
                                            thickness: 3
                                        };
                                        //looking later
                                        // trace.width = Array(response.Subplots[k].Charts[i].Series[j].Data.length).fill(0.5);
                                        trace.width = 1000;
                                        trace.name = response.Subplots[k].Charts[i].ChartName;
                                        trace.marker.color = response.Subplots[k].Charts[i].Series[j].Colors;
                                        trace.type = 'bar';
                                        trace.orientation = 'h';
                                        trace.textposition = "none";
                                        //looking later

                                        //trace.text = response?.Subplots[k]?.Charts[i]?.Series[j]?.Text,
                                        trace.text = response.Subplots[k].Charts[i].Series[j].Text;
                                        trace.hovertemplate = '%{text}' + '<extra></extra>';
                                    }

                                }
                                else {
                                    trace.text = response.Subplots[k].Charts[i].Series[j].Data.map((obj) => {
                                        if (obj != null) {
                                            if (obj != 9876543210123) {
                                                return thousands_separators((numberFormat.numbeFormat.prefix + (obj / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix));
                                            }
                                            else {
                                                return 'NA'
                                            }
                                        }
                                    });
                                    trace.textposition = 'outside';
                                    trace.cliponaxis = false;
                                }
                                if (response.Subplots[k].Charts[i].ChartName == "Activity" || response.Name == "Tactic") {
                                    trace.text = response.Subplots[k].Charts[i].Series[j].Text;
                                }
                                if (response.Name == "Tactic") {
                                    trace.textposition = 'inside';
                                    trace.cliponaxis = false;
                                }
                                
                            }
                            
                        }
                        else {
                            trace.text = response.Subplots[k].Charts[i].Series[j].Data.map((obj) => {
                                if (obj != null) {
                                    if (obj != 9876543210123) {
                                        return thousands_separators((numberFormat.numbeFormat.prefix + (obj / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix));
                                    }
                                    else {
                                        return 'NA'
                                    }
                                }
                            });
                            trace.x = categoryAxisArray.length > 0 ? categoryAxisArray[0].Data:[];
                            trace.y = response.Subplots[k].Charts[i].Series[j].Data.map((obj) => {
                                if (obj != null) {
                                    return obj != 9876543210123 ? (obj / numberFormat.divideNumber) : 9876543210123
                                }
                                else {
                                    return null;
                                }
                            });
                            if (trace.y.indexOf(9876543210123) != -1) {
                                for (var u = 0; u < trace.y.length; u++) {
                                    if (trace.y[u] === 9876543210123) {
                                        var arr = trace.y.filter((x) => { return x != 9876543210123 });
                                        if (arr.length === 0) {
                                            arr.push(0);
                                        }
                                        trace.y[u] = Math.max.apply(null, arr);
                                    }
                                }
                            }
                            
                            if (response.Subplots[k].Charts[i].Series.length <= 3 && response.Subplots[0].CategoryAxis[0].Data.length < 15) {
                                trace.textposition = j % 2 == 1 ? 'top' : 'bottom';
                                trace.mode = trace.mode + '+text';
                                trace.cliponaxis = false;
                            }
                           
                        }
                        trace.showlegend = response.Subplots[k].Charts[i].ShowLegend;
                        if (response.Subplots[k].Charts[i].ShowLegend == true) {
                            if (response.Subplots[0].Charts[0].ChartType == "BubbleChart" && k == 0) {
                                trace.showlegend = true;
                            }
                            else if (response.Subplots[0].Charts[0].ChartType == "LineChart-dots") {
                                trace.showlegend = true;
                            }
                            else if (response.Subplots[0].Charts[0].ChartType == "BarChart-Stack") {
                                trace.showlegend = true;
                            }
                            else if (response.Subplots[0].Charts[0].ChartType == "BarChart-Horizontal/Stack") {
                                trace.showlegend = true;
                            }
                            else {
                                trace.showlegend = false;
                            }
                        }
                        //if legend is to be shown and is subplot
                        if (response.Subplots[0].Charts[0].ChartType == "BubbleChart" && response.SupportSubPlots == true && response.Subplots[k].Charts[i].Series[j].Colors.length == 0) {
                            trace.legendgroup = response.Subplots[k].Charts[i].Series[j].Name;
                        }
                        //trace.name = response.Subplots[k].Charts[i].ChartName + ' - ' + response.Subplots[k].Charts[i].Series[j].Name;
                        trace.name = response.Subplots[k].Charts[i].Series[j].Name;
                        if (trace.name == null || trace.name == undefined) {
                            trace.name = response.Subplots[k].Charts[i].ChartName;
                        }
                        if (response.Subplots[k].Charts[i].Attribute.IsDifferenceChart == false) {
                            trace.marker.color = response.Subplots[k].Charts[i].Series[j].Colors.length > 0 ? response.Subplots[k].Charts[i].Series[j].Colors : response.Subplots[k].Charts[i].Series[j].Color;
                        }
                        else {
                            var colors = [];
                            for (var o = 0; o < response.Subplots[k].Charts[i].Series[j].Data.length; o++) {
                                var value = response.Subplots[k].Charts[i].Series[j].Data[o];
                                if (value <= -50) {
                                    colors.push('#AE123A');
                                }
                                else if (value > -50 && value <= -30) {
                                    colors.push('#DB3440');
                                }
                                else if (value > -30 && value <= -20) {
                                    colors.push('#F36A58');
                                }
                                else if (value > -20 && value <= -10) {
                                    colors.push('#FB9D89');
                                }
                                else if (value > -10 && value <= -5) {
                                    colors.push('#FECCC6');
                                }
                                else if (value > -5 && value <= 5) {
                                    colors.push('#F1F3FA');
                                }
                                else if (value > 5 && value <= 10) {
                                    colors.push('#B6E2AF');
                                }
                                else if (value > 10 && value <= 20) {
                                    colors.push('#82C775');
                                }
                                else if (value > 20 && value <= 30) {
                                    colors.push('#5FA858');
                                }
                                else if (value > 30 && value <= 50) {
                                    colors.push('#3A8948');
                                }
                                else if (value >= 50) {
                                    colors.push('#24693D');
                                }
                            }
                            trace.marker.color = colors;
                        }
                        if (response.SupportSubPlots == true) {
                            trace.xaxis = (i != 0 ? 'x' + (i + 1) : 'x');
                            trace.yaxis = (k == 0 ? 'y' : 'y' + (k + 1));
                        }
                        else {
                            trace.yaxis = response.Subplots[k].Charts[i].Series[j].ValueAxisName;
                        }
                        traces.push(trace);
                        
                    }
                    
                    
                    if (response.Subplots[k].Charts[i].Shapes.length > 0) {
                        var xx = [];
                        for (var h = 0; h < traces[0].y.length; h++) {
                            var series = 0;
                            for (var l = 0; l < traces.length; l++) {
                                series = series + traces[l].y[h];
                            }
                            xx.push(series);
                        }
                    }
                   

                    //Add Shapes
                    for (var l = 0; l < response.Subplots[k].Charts[i].Shapes.length; l++) {
                        var shape = response.Subplots[k].Charts[i].Shapes[l];
                        var datex0 = shape.x0.replaceAll('/', "-");
                        var arr = datex0.split("-");
                        datex0 = arr[2] + "-" + arr[0] + "-" + arr[1];
                        var datex1 = shape.x1.replaceAll('/', "-");
                        var arr = datex1.split("-");
                        datex1 = arr[2] + "-" + arr[0] + "-" + arr[1];
                        var datey0 = shape.y0.replaceAll('/', "-");
                        var arr = datey0.split("-");
                        datey0 = arr[2] + "-" + arr[0] + "-" + arr[1];
                        var datey1 = shape.y1.replaceAll('/', "-");
                        var arr = datey1.split("-");
                        datey1 = arr[2] + "-" + arr[0] + "-" + arr[1];
                        shapes.push({
                            type: shape.type,
                            yref: shape.yref,
                            xref: shape.xref,
                            x0: new Date(datex0),
                            x1: new Date(datex1),
                            y0: shape.y0,
                            y1: shape.y1,
                            opacity: 0.2,
                            fillcolor: shape.color,
                            line: {
                                width: 0
                            }
                        });
                        traces.push({
                            mode: 'text',
                            x: [new Date(new Date(datex1)-(new Date(datex1)-new Date(datex0))/2)],
                            y: [Math.max.apply(null, xx)*1.1],
                            text: [shape.Name],
                            showlegend:false
                        })
                    }
                    
                }
                if (response.SupportSubPlots === true && type === 'bar') {
                    if (window.location.href.includes("Report/BudgetComparison") && divName === "budgetDetailsChart") {
                        totalbarCountChart += response.Subplots[k].Rows;
                    } else {
                        totalbarCountChart += response.Subplots[k].Charts[0].Series[0].Data.length;
                    }
                    
                }
            }
            if (response.SupportSubPlots === true && response.Subplots[0].Charts[0].ChartType.split("/")[0] === 'BarChart-Horizontal') {
                for (var e = 0; e < response.Subplots.length; e++) {
                    upperDomainRange.push(response.Subplots[e].Charts[0].Series[0].Data.length / totalbarCountChart);
                }
            }
            var data = traces;
            var layout = {
                autosize:true,
                barmode: barmode,
                hovermode: 'closest',
                margin: {
                    //t:100
                    pad: 10,
                    b: 50, t: showLegend == true ? 80 :50
                }
            }
            if (shapes.length > 0) {
                layout.shapes = shapes;
            }
            //if legend is to be shown
            if (showLegend == true) {
                layout.legend = {
                    orientation: "h",
                    yanchor: "bottom",
                    y: 1.05,
                    xanchor: "center",
                    x: 0.5
                }
            }
            //code for date type implementation
            var minDateFormat = "";
            for (var j = 0; j < response.Subplots.length; j++) {
                for (var k = 0; k < response.Subplots[j].CategoryAxis.length; k++) {
                    if (response.Subplots[j].CategoryAxis[k].UiDataType != null) {
                        if (response.Subplots[j].CategoryAxis[k].UiDataType.includes("date")) {
                            for (var i = 0; i < response.Subplots[j].CategoryAxis[k].Data.length; i++) {
                                var date = response.Subplots[j].CategoryAxis[k].Data[i].replaceAll('/', "-");
                                var arr = date.split("-");
                                response.Subplots[j].CategoryAxis[k].Data[i] = arr[2] + "-" + arr[0] + "-" + arr[1];
                            }
                            var maxDate = new Date(Math.max.apply(null, response.Subplots[j].CategoryAxis[k].Data.map(x => {
                                return new Date(x)
                            })));
                            var minDate = new Date(Math.min.apply(null, response.Subplots[j].CategoryAxis[k].Data.map(x => {
                                return new Date(x)
                            })));
                            var today = new Date();
                            var dd = today.getDate();
                            var mm = today.getMonth() + 1;
                            var yyyy = today.getFullYear();
                            var todaysDate = yyyy + "-" + mm + "-" + dd;
                            let monthNames = ["Jan", "Feb", "Mar", "Apr",
                                "May", "Jun", "Jul", "Aug",
                                "Sep", "Oct", "Nov", "Dec"];
                            var minDateMonth = minDate.getMonth() + 1;
                            minDateFormat = minDate.getFullYear() + "-" + minDateMonth + "-" + minDate.getDate();
                            layout.xaxis = {
                                automargin: true,
                                tickmode: 'linear',
                                title: response.Subplots[j].CategoryAxis[k].Label,
                                tick0: minDateFormat,
                                dtick: 1 * 24 * 60 * 60 * 1000
                            }
                            if (response.Subplots[j].CategoryAxis[k].UiDataType.split("-")[1] == "Daily") {
                                layout.xaxis.dtick = 1 * 24 * 60 * 60 * 1000;
                                var numberofdays = (maxDate.getTime() - minDate.getTime()) / (1000 * 3600 * 24);
                                if (numberofdays > 300) {
                                    layout.xaxis.dtick = 10 * 24 * 60 * 60 * 1000;
                                }
                                else if (numberofdays > 200) {
                                    layout.xaxis.dtick = 10 * 24 * 60 * 60 * 1000;
                                }
                                else if (numberofdays > 100) {
                                    layout.xaxis.dtick = 5 * 24 * 60 * 60 * 1000;
                                }
                                else {
                                    layout.xaxis.dtick = 1 * 24 * 60 * 60 * 1000;
                                }
                            }
                            else if (response.Subplots[j].CategoryAxis[k].UiDataType.split("-")[1] == "Weekly") {
                                if (response.Subplots[j].CategoryAxis[k].Data.length > 30) {
                                    layout.xaxis.dtick = 35 * 24 * 60 * 60 * 1000;
                                }
                                else {
                                    layout.xaxis.dtick = 7 * 24 * 60 * 60 * 1000;
                                    layout.xaxis.tickmode = 'auto';
                                }
                                
                            }
                            else if (response.Subplots[j].CategoryAxis[k].UiDataType.split("-")[1] === "Monthly") {
                                layout.xaxis.dtick = 30 * 24 * 60 * 60 * 1000;
                            }
                            else if (response.Subplots[j].CategoryAxis[k].UiDataType.split("-")[1] === "Quarterly") {
                                layout.xaxis.dtick = 120 * 24 * 60 * 60 * 1000;
                            }
                            layout.xaxis.range = [minDate, maxDate];
                            //layout.xaxis.tickmode= 'auto';
                            //layout.xaxis.nticks = 30;
                            layout.xaxis.tick0 = minDate;
                            //layout.xaxis.dtick = 4;

                        }
                    }
                    else {
                        layout.xaxis = { title: response.Subplots[j].CategoryAxis[k].Label };
                    }
                }
            }
            
            //code for subplot implementation
            if (response.SupportSubPlots == true) {
                var lastValue = 0;
                for (var i = 0; i < response.Subplots.length; i++) {
                    var rows = response.Subplots[i].Rows;
                    var columns = response.Subplots[i].Columns;
                    var domainwidth = 1 / columns, lastwidth = domainwidth;
                    for (var j = 0; j < rows; j++) {
                        for (var k = 0; k < columns; k++) {
                            var numberFormat = numberformatFunction1(response.Subplots[i].Charts[k].Series[0].NumberFormat);
                            var valueAxisName = response.Subplots[i].Charts[k].Series[0].ValueAxisName;
                            var valueAxisArray = response.Subplots[i].ValueAxis.filter(a => a.Name == valueAxisName);
                            if (k == 0) {
                                layout.xaxis = {
                                    domain: columns == 1 ? [0, 1] : columns == 2 ? [0, domainwidth - 0.1] : [0, domainwidth],
                                    automargin: true,
                                    title: valueAxisArray[0].Label,
                                    tickformat: numberFormat.format,
                                    ticksuffix: numberFormat.numbeFormat.postfix,
                                    tickprefix: numberFormat.numbeFormat.prefix,
                                    rangemode: 'tozero',
                                    tickangle:0
                                }
                            }
                            else {
                                layout['xaxis' + (k + 1)] = {
                                    domain: [lastwidth+0.1, lastwidth + domainwidth],
                                    automargin: true,
                                    title: (response.Subplots[i].ValueAxis[k].Label != null || response.Subplots[i].ValueAxis[k].Label != "") ? response.Subplots[i].ValueAxis[k].Label : valueAxisArray[0].Label,
                                    tickformat: numberFormat.format,
                                    ticksuffix: numberFormat.numbeFormat.postfix,
                                    tickprefix: numberFormat.numbeFormat.prefix,
                                    rangemode: 'tozero',
                                    tickangle: 0
                                }
                                lastwidth = lastwidth + domainwidth;
                            }
                        }
                        var divlen = 1 / response.Subplots.length;
                        var divarray = [];
                        divarray.push(0);
                        for (var p = 1; p < response.Subplots.length; p++) {
                            divarray.push(p*divlen - 0.10);
                        }
                        divarray.push(1);

                        if (i == 0) {
                            layout.yaxis = {
                                automargin: true,
                                title: response.Subplots[i].Label
                            }
                            
                            if (response.SupportSubPlots == true && response.Subplots[0].Charts[0].ChartType.split("/")[0] == 'BarChart-Horizontal') {
                                layout.yaxis.domain = [0, parseFloat(upperDomainRange[i])];
                                lastValue = parseFloat(upperDomainRange[i]);
                            }
                            else {
                                if (response.Subplots.length > 1) {
                                    layout.yaxis.domain = [divarray[0], divarray[1]];
                                    //layout.yaxis.domain = [0, divlen];
                                }
                            }
                            
                        }
                        else {
                            layout['yaxis' + (i + 1)] = {
                                automargin: true,
                                title: response.Subplots[i].Label
                            }
                            
                            if (response.SupportSubPlots == true && response.Subplots[0].Charts[0].ChartType.split("/")[0] == 'BarChart-Horizontal') {
                                layout['yaxis' + (i + 1)].domain = [lastValue, parseFloat(upperDomainRange[i]) + lastValue];
                                if (i == response.Subplots.length - 1) {
                                    layout['yaxis' + (i + 1)].domain = [lastValue, 1];
                                }
                                lastValue = parseFloat(upperDomainRange[i]) + lastValue;
                                if (i == response.Subplots.length - 1) {
                                    lastValue = 1;
                                }
                            }
                            else {
                                if (response.Subplots.length > 1) {
                                    //if (i == 1) {
                                    layout['yaxis' + (i + 1)].domain = [divarray[i] + 0.10, divarray[i + 1]];
                                    //}
                                    //else {
                                    //    layout['yaxis' + (i + 1)].domain = [divarray[i]+0.10, divarray[i+1]];
                                    //}
                                }
                            }
                        }
                    }
                }
                layout.grid = {
                    rows: response.Subplots.length,
                    columns: response.Subplots[0].Charts.length,
                    roworder: 'bottom to top'
                }
                if (response.SupportSubPlots == true) {
                    if (divName == "effectivenessResponsesSummaryChart" || divName == "budgetSummaryChart" || divName == "returnSummaryChart") {

                        // calculate max value of  subplot group name and categories axis data
                        var max1, max2, diffNo, arrayMaxRow = [], arrayMaxRow1 = [], maxRow, maxRow1, maxCharacterArray1 = [], maxCharacterArray = [];
                        for (var j = 0; j < response.Subplots.length; j++) {
                            arrayMaxRow = []; arrayMaxRow1 = [];
                            for (var k = 0; k < response.Subplots[j].CategoryAxis.length; k++) {
                                for (var l = 0; l < response.Subplots[j].CategoryAxis[k].Data.length; l++) {
                                    arrayMaxRow.push(response.Subplots[j].CategoryAxis[k].Data[l].length);
                                }
                                maxRow = Math.max(...arrayMaxRow);
                                maxCharacterArray.push(maxRow);
                            }
                            if (response.Subplots[j].Label != null) {
                                if (response.Subplots[j].Label.indexOf('<br>') != -1) {
                                    var firstString = response.Subplots[j].Label.split('<br>')[0];
                                    var secondString = response.Subplots[j].Label.split('<br>')[1];
                                    arrayMaxRow1.push(firstString.length);
                                    arrayMaxRow1.push(secondString.length);
                                }
                                else {
                                    arrayMaxRow1.push(response.Subplots[j].Label.length);
                                }
                            }
                            maxRow1 = Math.max(...arrayMaxRow1);
                            maxCharacterArray1.push(maxRow1);
                        }
                        max1 = Math.max(...maxCharacterArray);
                        max2 = Math.max(...maxCharacterArray1);
                        var adjustLeftMargin = (max1 * 7) + (max2 * 7 + 50);
                        layout.margin = {
                            pad: 10,
                            l: adjustLeftMargin,
                            r: 50,
                            b: 50,
                            t: showLegend == true ? 80 : 50,
                        };
                        //if legend is to be shown
                        if (showLegend == true) {
                            layout.showlegend = true;
                            layout.legend = {
                                orientation: "h",
                                yanchor: "bottom",
                                y: 1.05,
                                xanchor: "center",
                                x: 0.5
                            }
                        }
                        /////////////
                    }
                }
            }
            else if (response.Subplots[0].Charts.length > 0 && response.Subplots[0].Charts[0].Series.length > 0){
                var valueAxisName = response.Subplots[0].Charts[0].Series[0].ValueAxisName;
                var valueAxisArray = response.Subplots[0].ValueAxis.filter(a => a.Name == valueAxisName);

                if (valueAxisName.includes('y')) {
                    var numberFormat = numberformatFunction1(response.Subplots[0].ValueAxis[0].NumberFormat);

                    layout.yaxis = {
                        automargin: true,
                        title: valueAxisArray.length > 0 ? valueAxisArray[0].Label:'',
                        tickformat: numberFormat.format,
                        ticksuffix: numberFormat.numbeFormat.postfix,
                        tickprefix: numberFormat.numbeFormat.prefix
                    }
                    if (response.Subplots[0].Charts[0].ChartType == "LineChart-dots") {
                        var arr = [];
                        for (var i = 0; i < data.length; i++) {
                            arr = arr.concat(data[i].y);
                        }
                        var max = Math.max.apply(null, arr);
                        var min = Math.min.apply(null, arr);
                        layout.yaxis.range = [min<0 ? min:0,max];
                    }
                    if (response.Subplots[0].ValueAxis.length > 1) {
                        var numberFormat2 = numberformatFunction1(response.Subplots[0].ValueAxis[1].NumberFormat);
                        layout.yaxis2 = {
                            automargin: true,
                            title: valueAxisArray[0].Label,
                            tickformat: numberFormat2.format,
                            ticksuffix: numberFormat2.numbeFormat.postfix,
                            tickprefix: numberFormat2.numbeFormat.prefix,
                            side: 'left',
                            //overlaying: 'y'
                        }
                        layout.yaxis.overlaying = 'y2';
                    }
                }
                else {
                    var numberFormat = numberformatFunction1(response.Subplots[0].Charts[0].Series[0].NumberFormat);
                    layout.xaxis = {
                        automargin: true,
                        title: valueAxisArray.length > 0 ? valueAxisArray[0].Label:'',
                        tickformat: numberFormat.format,
                        ticksuffix: numberFormat.numbeFormat.postfix,
                        tickprefix: numberFormat.numbeFormat.prefix,
                        rangemode: 'tozero',
                        tickangle: 0
                    }
                    if (response.Subplots[0].Charts[0].ChartType == "LineChart-dots") {
                        var arr = [];
                        for (var i = 0; i < data.length; i++) {
                            arr = arr.concat(data[i].x);
                        }
                        var max = Math.max.apply(null, arr);
                        var min = Math.min.apply(null, arr);
                        layout.xaxis.range = [min < 0 ? min : 0, max];
                    }
                }
                
            }
            
            if (response.Subplots[0].Charts[0].ChartType == "BubbleChart" && layout.grid.rows < 2 && response.SupportSubPlots != true) {
                if (data[0].y.length == 1) {
                    layout.height = 250;
                }
                else if (data[0].y.length == 2) {
                    layout.height = 350;
                }
            }
            if (response.SupportSubPlots == true && response.Subplots[0].Charts[0].ChartType.split("/")[0] == 'BarChart-Horizontal') {
                var finalHeight = 0;
                if (totalbarCountChart >= 20) {
                    finalHeight = finalHeight + (totalbarCountChart * 25);
                } else {
                    finalHeight = finalHeight + calculateBarHeight(totalbarCountChart);
                }
                if (layout.grid.rows == 1) {
                    finalHeight = calculateBarHeight(totalbarCountChart);
                }
                layout.height = finalHeight + (0.03 * layout.grid.rows);
                layout.grid.subplots = [];
                for (var i = 0; i < response.Subplots.length; i++) {
                    var arr = [];
                    for (var j = 0; j < layout.grid.columns; j++) {
                        if (i == 0) {
                            var y = 'y';
                            if (j == 0) {
                                arr.push('x' + y);
                            }
                            else {
                                //var y = 'y'+i;
                                arr.push('x' + (j + 1) + y);
                            }
                        }
                        else {
                            var y = 'y' + (i + 1);
                            if (j == 0) {
                                arr.push('x' + y);
                            }
                            else {
                                arr.push('x' + (j + 1) + y);
                            }
                        }
                    }
                    layout.grid.subplots.push(arr);
                }                    
            }
            if (response.Name == "Tactic") {
                var layout = {
                    barmode: 'stack',
                    hovermode: 'closest',
                    xaxis: {
                        automargin: true,
                        tickangle: 0,
                       /* title: 'Spend(' + currencySign + 'k)',*/
                        title: 'Spend(' + "" + 'k)',
                        tickformat: numberFormat.format,
                        ticksuffix: numberFormat.numbeFormat.postfix,
                        tickprefix: numberFormat.numbeFormat.prefix
                    },
                    yaxis: {
                        automargin: true,
                        title: {
                            text: "Tactics",
                            //standoff: 110
                        },
                        ticksuffix: ''
                    },
                    legend: {                          
                    },
                };
                if (response.Subplots[0].CategoryAxis[0].Data.length > 0) {
                    if (response.Subplots[0].CategoryAxis[0].Data.length >= 20) {
                        layout.height = response.Subplots[0].CategoryAxis[0].Data.length * 25;
                    }
                    else {
                        layout.height = calculateBarHeight(response.Subplots[0].CategoryAxis[0].Data.length, true);
                    }
                }   
            }
            if (response.Name == "Activity" && response.Subplots[0].Charts[0].ChartType == "BarChart") {
                var layout = {};
                var activityDateList = response.Subplots[0].CategoryAxis[0].Data;
                var activityStartDateList = activityDateList.filter(function (itm, i, activityDateList) {
                    return i == activityDateList.indexOf(itm);
                });
                var data = [
                    {
                        x: activityStartDateList,
                        y: response.Subplots[0].Charts[0].Series[0].Data,
                        error_y: {
                            type: 'data',
                            visible: true,
                            symmetric: false,
                            array: response.Subplots[0].Charts[0].ErrorBars.ArrayValue,
                            arrayminus: response.Subplots[0].Charts[0].ErrorBars.ArrayMinusValue,
                            thickness: 3
                        },
                        type: 'bar',
                        text: response.Subplots[0].Charts[0].Series[0].Text,
                        textposition: 'none',
                       /* hovertemplate: response.Subplots[0].Charts[0].Series[0].Text,*/
                        hovertemplate: '%{text}' + '<extra></extra>',
                       
                        marker: {
                            color: response.Subplots[0].Charts[0].Series[0].Colors
                        },
                        /* name: "Allocated Budget(" + currencySign + "k)",*/
                        name: "Allocated Budget(" + "" + "k)",
                    }
                ];
                 layout = {
                    annotations: response.Subplots[0].Charts[0].Annotations,
                    xaxis: {
                        title: 'Date'
                    },
                    yaxis: {
                        automargin: true,
                        ticksuffix: '',
                       /* tickprefix: currencySign,*/
                        tickprefix: '$',
                        tickformat: ',.2f',
                        /*title: 'Allocated Budget(' + currencySign + 'k)'*/
                        title: 'Allocated Budget(' + "" + 'k)'
                    }
                }
            }
            if (response.Subplots[0].Charts[0].ChartType.split("/")[0] == 'BarChart-Horizontal' && (response.Subplots[0].Charts[0].hasOwnProperty('Annotations') && response.Subplots[0].Charts[0].Annotations != null) && (response.Subplots[0].Charts[0].hasOwnProperty('ErrorBars') && response.Subplots[0].Charts[0].ErrorBars != null)) {
                
                var layout = {
                    annotations: annotations,
                    //showlegend: false,
                    grid: {
                        rows: 1,
                        columns: 1,
                        pattern: 'independent',
                        roworder: 'bottom to top'
                    },
                    yaxis: {
                        automargin: true,
                        title: 'GRP',
                        standoff: 20,
                        categoryorder: 'category ascending'
                    },
                    xaxis: {
                        tickformat: ',.0f',
                        ticksuffix: 'GRP'
                    },
                    transforms: [{
                        type: 'sort',
                        target: 'y',
                        order: 'descending'
                    }]
                };                    
                for (var i = 0; i < data.length; i++) {
                    if (i == 0 && data[i].name.includes('Dollar')) {
                        layout.yaxis.title = 'Dollar';
                        layout.xaxis.tickformat = ',.2f';
                        layout.xaxis.prefix = currencySign;
                        layout.xaxis.ticksuffix = '';
                        layout.xaxis.title = "Allocated Budget(" + currencySign + "k)";
                        layout.yaxis.ticksuffix = '';
                        layout.yaxis.prefix = currencySign;
                    }
                    else if (i == 1 && data[i].name.includes('Dollar')) {
                        layout.yaxis2 = {
                            title: 'Dollar',
                            ticksuffix: '',
                            tickprefix: currencySign
                        }
                        layout.xaxis2 = {
                            tickformat: '$,.2f',
                            ticksuffix: 'k',
                            tickprefix: currencySign
                        }
                        layout.xaxis2.title = "Allocated Budget(" + currencySign + "k)";
                    }
                    else if (i == 0 && data[i].name.includes('GRP')) {
                        layout.yaxis.title = 'GRP';
                        layout.yaxis.ticksuffix = '';
                        layout.xaxis.tickformat = ',.0f';
                        layout.xaxis.ticksuffix = 'GRP';
                        layout.xaxis.title = "Allocated Budget(GRP)";
                    }
                    else if (i == 1 && data[i].name.includes('GRP')) {
                        layout.yaxis2 = {
                            title: 'GRP',
                            ticksuffix: ''
                        }
                        layout.xaxis2 = {
                            tickformat: ',.0f',
                            ticksuffix: 'GRP',
                            title: "Allocated Budget(GRP)"
                        }
                    }
                }

                if (data.length > 1) {
                    layout.yaxis2.automargin = true;
                    layout.yaxis2.standoff = 20;
                    layout.grid.rows = 2;
                    data[1].xaxis = 'x2';
                    data[1].yaxis = 'y2';
                }
                if (data.length == 1) {
                    layout.annotations.forEach(function (arrayItem) {
                        arrayItem.xref = 'x';
                        arrayItem.yref = 'y';
                    });
                }
                var totalbarcount = 0;
                for (var i = 0; i < data.length; i++) {
                    totalbarcount += data[i].y.length;
                }

                if (totalbarcount >= 20) {
                    // looking later
                    // layout.height = tacticList.length * 25;
                    layout.height = 200;

                }
                else {
                    layout.height = calculateBarHeight(totalbarcount, true);
                }

                // budget constraint
                if (response.Name == "Budget Constraints") {
                    layout = {};
                    layout = {
                        annotations: annotations,
                        hovermode: "closest",
                        hoverlabel: {
                            align: 'left'
                        },
                        yaxis: {
                            automargin: true,
                            title: 'GRP',
                            standoff: 20,
                            categoryorder: 'category ascending'
                        },
                        xaxis: {
                            tickformat: ',.0f',
                            ticksuffix: 'GRP'
                        },
                        transforms: [{
                            type: 'sort',
                            target: 'y',
                            order: 'descending'
                        }]
                    };

                    layout.yaxis.title = 'Dollar';
                    layout.xaxis.tickformat = ',.0f';
                    layout.xaxis.prefix = currencySign;
                    layout.xaxis.ticksuffix = '';
                    layout.xaxis.title = "Allocated Budget(" + currencySign + "k)";
                    layout.yaxis.ticksuffix = '';
                    layout.yaxis.prefix = currencySign;

                    if (data.length == 1) {
                        layout.annotations.forEach(function (arrayItem) {
                            arrayItem.xref = 'x';
                            arrayItem.yref = 'y';
                        });
                    }
                    var totalbarcount = 0;
                    for (var i = 0; i < data.length; i++) {
                        totalbarcount += data[i].y.length;
                    }

                    if (totalbarcount >= 20) {
                        layout.height = totalbarcount * 25;
                    }
                    else {
                        layout.height = calculateBarHeight(totalbarcount, true);
                    }                        

                }// end of budget constraints
            }
            var config_export = getExportConfig(divName, dataForAddLog);
            if (response.Subplots[0].Charts[0].ChartType == "BubbleChart") {
                if (layout.grid.rows > 1) {
                    var totalbars = 0;
                    for (var i = 0; i < data.length; i++) {
                        totalbars += data[i].y.length;
                    }
                }
                else {
                    totalbars = data[0].y.length;
                }
                if (totalbars > 20 && totalbars <= 100) {
                    layout.height = totalbars * 25;
                }
                else if (totalbars > 100 && totalbars <= 200) {
                    layout.height = totalbars * 15;
                }
                else if (totalbars == 1) {
                    layout.height = 250;
                }
                else if (totalbars == 2) {
                    layout.height = 350;
                }
                else {
                    layout.height = 450
                }
            }
            if (window.parent.document.fullscreenElement != null) {
                if (layout.height <= 800) {
                    layout.height = 800;
                }
            }  
            return {data, layout, config_export}
            //Plotly.newPlot(div, data, layout, config_export /*{ displayModeBar: true }*/);
            //code for subplot implementation
            if (response.SupportSubPlots == true) {
                if (divName == "effectivenessResponsesSummaryChart" || divName == "budgetSummaryChart" || divName =="returnSummaryChart") {
                    // looking later
                    // var left = "-" + (adjustLeftMargin - 50) + "px";
                    // var top = 0 + 'px';
                    // $('#' + divName + ' .infolayer [class^="g-y"][class$="title"]').css({ 'transform': 'translate(' + left + ', ' + top + ')' });
                    // $('#' + divName + ' .infolayer [class^="y"][class$="title"]').css({ 'transform': 'rotate(0deg)', 'text-anchor': 'start' });

                }
            }  
            // looking later                        
            // $('#' + divName).siblings('.overlay').hide();
            // $('#' + divName).next().hide();
            
        }
        else {
            // looking later
            // noData('#'+divName,true,'No Data Available');
            // $('#'+divName).siblings('.overlay').hide();
        }
    }




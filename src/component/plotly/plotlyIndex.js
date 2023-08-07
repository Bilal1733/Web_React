import React, { useState } from 'react';
import PlotlyComponent from './plotlycomponent';
import { response1, response2, response3, response4} from './data';

const PlotlyIndex = (props) => {
    const [response, setresponse] = useState(1)
    let responseData = {};
    if(response == 1){
        responseData = response1  
    }
    else if(response == 2){
        responseData = response2  
    }
    else if(response == 3){
        responseData = response3 
    }
    else if(response == 4){
        responseData = response4 
    }
    return(
        <>
        <select onChange={(data)=>setresponse(data.target.value)}>
            <option value={1}>res1</option>
            <option value={2}>res2</option>
            <option value={3}>res3</option>
            <option value={4}>res4</option>
        </select>
        <PlotlyComponent 
        divName = "effectivenessResponsesSummaryChart"
        responseData = {responseData}
        showLegend = 'true'
        currencySign = '$'
        dataForAddLog= {{
          "reportId": 7670,
          "auditName": 0,
          "reportType": 10,
          "generateType": 1,
          "eventDescription": "",
          }}
        />
        </>
    )
}

export default PlotlyIndex;
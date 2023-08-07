import React from 'react';
import Timeline from 'react-visjs-timeline';
import { response1} from './visdata';
import {Viscommon} from './Viscommon'
import { thousands_separators , visTimelineBlockContent} from '../common';

export default function VisCompoent() {
    var mainConfig = {
        group: {
            name_field: "GroupByValueData",
            title_field: "TacticDescription",
            content_field: "CampaignGroupName",
            handler: function (outData, _group) {

            }
        },
        item: {
            content_field: "BudgetAmount",
            start_field: "CampaignStartDate",
            end_field: "CampaignEndDate",
            color_field: "HexColor",
            title: function (config, outData, month, oneDay) {
                return '<div class="ganttChartTooltip"><b class="">CAMPAIGN:</b> ' + outData["CampaignName"] + ' (ID: ' + outData["CampaignID"]+ ')'                         
                    + '<br/><b class="">PERIOD:</b> ' + outData[config.item.start_field].split('-')[2] + " " + month[parseInt(outData[config.item.start_field].split('-')[1])] + " "
                    + outData[config.item.start_field].split('-')[0] + ' - ' + outData[config.item.end_field].split('-')[2] + " " + month[parseInt(outData[config.item.end_field].split('-')[1])] + " "
                    + outData[config.item.end_field].split('-')[0]
                    + '<br/><b class="">BUDGET: </b>' + currencySign + thousands_separators(parseFloat((outData["BudgetAmount"]) / 1000).toFixed(2)) + 'k' + '<br/><b class="">WORKFLOW STATUS:</b> ' + outData["WorkflowStatusName"] + '<br/><b class="">LOCK STATUS:</b> ' + ((outData["Locked"] == false) ? "Unlocked" : "Locked") + '<br/><b class="">MONITOR STATUS:</b> ' + ((outData["MonitorStatus"] == 1) ? "Monitored" : "Not Monitored") + '<br/>' +
                    ((outData['PercentBudgetConsumed'] != null) ? ('<b>PLANNED SPEND: </b>' + parseFloat(outData['PercentBudgetConsumed']).toFixed(2) + '% Spend to date<br/>') : '') +
                    '<b>CURRENT PLAN: </b>' + outData['PlanName'] + ' (ID: ' + outData['PlanID'] + ') | Plan Version: ' + outData["FormattedVersionDate"]+'</div>';
            },
            handler: function (outData, _item) {
                if (outData["BudgetAmount"] == null || outData["BudgetAmount"] == 0) {
                    _item.style = 'color: black;background-color: #F1F3FA; background-size: 20px 20px;border-width:2px;border-color:' + outData["HexColor"];
                    visTimelineBlockContent(_item, 'span', 'itemFlowchart', [],[], '0.00', 'color', '#F1F3FA');
                }
            }
        }
    };
    var currencySign = "$";
    var responseData = Viscommon(response1,mainConfig ,'visualizationFlowchart',)
    console.log(responseData ,'responseData',)
  return (
    <div>
        <div style={{height:'200px'}}>
        <Timeline
            options={responseData.options}
            items={responseData.items}
            groups={responseData.groups}
        />
        </div>
    
    </div>
  )
}

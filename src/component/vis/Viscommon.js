
import {visTimelineBlockContent ,numberformatFunction} from '../common.js';
var currencySign = "$";

export const Viscommon = (data, config, element, notid = false, elementParent = "", planList = []) => {
    var objectParameters = {
        items: '',
        groups: '',
        timeline: ''
    };

    // container = document.getElementById(element);
    var container = "visualizationFlowchart"
    // if (notid == true) {
    //     if (elementParent != "") {
    //         container = $(elementParent).find('#' + element);
    //     }
    // }
    var items1 = [];
    var groups1 = [] ;
    var mainGroup = [];
    var index = 1;

    const returnEverything = (param1) => {
        return param1;
    }

    //Code to create main groups as seperators
    //console.log('hello', data, mainGroup)
    if (element != "timinFlowchart") {
        for (var i = 0; i < data.length; i++) {
            var group = mainGroup.filter(obj => { return obj.groupName === data[i][config.group.name_field] });
            if (group.length == 0) {
                var _group = {
                    id: index,
                    content: '<b>' + data[i][config.group.name_field] + '</b>',
                    title: '',
                    groupName: data[i][config.group.name_field],
                    nestedGroups: [],
                    style: 'width:auto'
                }
                config.group.handler(data[i], _group);
                if (config.addIDs) {
                    _group.content += " <b>(ID: " + data[i].CampaignID + ")</b>";
                    _group.title = "";
                }
                mainGroup.push(_group);
                index++;
            }
        }
    }

    // for tactic flowchart
    if (config.addCampaignGroupIDs) {
        mainGroup = [];
    }
    //Code to create groups in timeline
    for (var i = 0; i < data.length; i++) {
        var group = groups1.filter(obj => {
            return obj.name === data[i][config.group.content_field] && obj.groupName === data[i][config.group.name_field]
        });
        if (group.length == 0) {
            var _group = {
                id: index,
                content: data[i][config.group.content_field],
                name: data[i][config.group.content_field],
                title: data[i][config.group.title_field],
                groupName: data[i][config.group.name_field],
                data: data[i],
                style: 'width:auto;padding-right:50px'
            }
            config.group.handler(data[i], _group);
            const abc = () => {    
                return(
                    <div class="d-flex flex-row align-items-center max-w-250">
                        <div style="">`${data[i][config.group.content_field]}`
                            <br/>
                            <span class='reportMetadataInfo'>(ID: `${data[i].CampaignID} ) | Campaign Group: ${data[i].CampaignGroupName}`</span>
                        </div>
                        <i title="Explore Data" data-entityId={`${data[i].CampaignID}`} class="fa fa-search-plus openExploreSpace exploreCampaignDetailsLink"></i>
                        <i title="Explore Data" data-entityId={`${data[i].CampaignID}`} class="fa fa-search-plus openExploreSpace exploreCampaignDetailsLink"></i>
                    </div>
                )
             };

             





            //if (element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart") {
            //    var checkPostCampaignReportCount = data[i].PostCampaignReportCount;
            //    if (checkPostCampaignReportCount > 0) {
            //        //_group.content += '<button data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#myModal2" class="margin-left-0 openExploreSpace exploreCampaignDetailsLink" data-entityId="' + data[i].CampaignID +'"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> Explore</button>'
            //        _group.content = '<div class="d-flex flex-row align-items-center max-w-250">' +
            //            '<div style="">' + data[i][config.group.content_field] + "<br/><span class='reportMetadataInfo'> (ID: " + data[i].CampaignID + ")" + ' | Campaign Group: ' + data[i].CampaignGroupName + '</span></div>' +
            //            '<button style="display:flex;width:100px" data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#myModal2" class="margin-left-0 padding-top-5 openExploreSpace exploreCampaignDetailsLink" data-entityId="' + data[i].CampaignID + '"><span><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg></span><span class="padding-left-5">' + checkPostCampaignReportCount + ' Reports</span></button>';
            //    }
            //    else {
            //        _group.content = '<div style="">' + data[i][config.group.content_field] + '</div>';
            //    }
            //}
            if (element == "campaignCapabilitiesHomePage" || element == "CapabilitiesOptimization Chart") {
                var checkPostCampaignReportCount = data[i].PostCampaignReportCount;
                //_group.content = '<button data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#myModal2" class="margin-left-0 openExploreSpace exploreCampaignDetailsLink" data-entityId="' + checkPostCampaignReportCount + '"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg> Explore</button>'
                if (checkPostCampaignReportCount > 0) {
                    // _group.content = '<div class="d-flex flex-row align-items-center max-w-250">' +
                    //     '<div style="">' + data[i][config.group.content_field] + "<br/><span class='reportMetadataInfo'> (ID: " + data[i].CampaignID + ")" + ' | Campaign Group: ' + data[i].CampaignGroupName + '</span></div>' +
                    //     '<i title="Explore Data" data-entityId=' + data[i].CampaignID + ' class="fa fa-search-plus openExploreSpace exploreCampaignDetailsLink"></i>' ,'<i title="Explore Data" data-entityId=' + data[i].CampaignID + ' class="fa fa-search-plus openExploreSpace exploreCampaignDetailsLink"></i>';
                    //'<button style="display:flex;width:85px" class="margin-left-0 openExploreSpace exploreCampaignDetailsLink" data-entityId="' + data[i].CampaignID + '"><span class="exploreCampaignDetailsLink--content padding-left-5 padding-right-5p">' + checkPostCampaignReportCount + ' Reports</span></button>';
                    _group.content = abc;
                } 
                else {
                    _group.content = '<div style="">' + data[i][config.group.content_field] + "<br/><span class='reportMetadataInfo'> (ID: " + data[i].CampaignID + ")" + ' | Campaign Group: ' + data[i].CampaignGroupName + '</span></div>';
                }
            }

            if (window.location.href.indexOf("Budget/List") > -1 || element == "TimelineViewAllBudgetChart") {
                _group.content = data[i][config.group.content_field] + " (ID: " + data[i].BudgetGroupID + ")";
            }
            if (config.tacticRedirection) {
                _group.content = '<a href="/Product/Tactic/Overview/' + data[i][config.group.tactic_Id] + '">' + data[i][config.group.content_field] + '</a>'
            }
            if (config.tooltipOnQuestionMark) {
                var title = escape(data[i][config.group.title_field]);
                if (window.location.href.indexOf("Plan/Scenario/Settings") > -1 || window.location.href.indexOf("Plan/PlanSettings/Overview") > -1 || window.location.href.indexOf("Plan/Scenario/Flowcharts") > -1) {
                    if (data[i].TacticAlwaysOn == true) {
                        if (data[i].EnableExtrapolation == true) {
                            title = title + "Extrapolation: Enabled" + "<br>" + "Flighting: Always On";
                            _group.content += '<span><i class="fa fa-question-circle cursorPointer margin-left-10 questionIconTooltip" title="' + title + '"></i><i class="fa fa-toggle-on margin-left-10" title="Flighting: On"></i><i class="fa fa-line-chart margin-left-10" title="Extrapolation: On"></i></span><span><span class="tacticSelect" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Select</span><span class="tacticUnselect display-hide" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Unselect</span></span>';
                        }
                        else {
                            title = title + "Extrapolation: Disabled" + "<br>" + "Flighting: Always On";
                            _group.content += '<span><i class="fa fa-question-circle cursorPointer margin-left-10 questionIconTooltip" title="' + title + '"></i><i class="fa fa-toggle-on margin-left-10" title="Flighting: On"></i></span><span><span class="tacticSelect" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Select</span><span class="tacticUnselect display-hide" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Unselect</span></span>';
                        }
                    }
                    else {
                        if (data[i].EnableExtrapolation == true) {
                            title = title + "Extrapolation: Enabled" + "<br>";
                            _group.content += '<span><i class="fa fa-question-circle cursorPointer margin-left-10 questionIconTooltip" title="' + title + '"></i></span><i class="fa fa-line-chart margin-left-10" title="Extrapolation: On"></i><span><span class="tacticSelect" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Select</span><span class="tacticUnselect display-hide" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Unselect</span></span>';
                        }
                        else {
                            title = title + "Extrapolation: Disabled" + "<br>";
                            _group.content += '<span><i class="fa fa-question-circle cursorPointer margin-left-10 questionIconTooltip" title="' + title + '"></i></span><span><span class="tacticSelect" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Select</span><span class="tacticUnselect display-hide" data-tacticID=' + data[i].TacticId + ' data-tacticName="' + data[i].GroupByValueData + '">Unselect</span></span>';
                        }

                    }


                }
                else {
                    _group.content += '<i class="fa fa-question-circle cursorPointer margin-left-10 questionIconTooltip" title="' + title + '"></i>';
                }
                _group.title = "";
            }
            else if (window.location.href.indexOf("Instance/CampaignList") > -1) {
                _group.content += '<span><span class="tacticSelect" data-tacticID="' + data[i].CampaignGroupName + '" data-tacticName="' + data[i].GroupByValueData + '">Select</span><span class="tacticUnselect display-hide" data-tacticID="' + data[i].CampaignGroupName + '" data-tacticName="' + data[i].GroupByValueData + '">Unselect</span></span>';
            }
            else if (window.location.href.indexOf("Budget/List") > -1) {
                //_group.content += '<span><span class="tacticSelect" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '">Select</span><span class="tacticUnselect display-hide" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '">Unselect</span></span>';
                _group.content += '<span><input type="checkbox" class="tacticSelect" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '"><input type="checkbox" class="tacticUnselect display-hide" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '"></span>';
            }
            else if (window.location.href.indexOf("Budget/Overview") > -1) {
                //_group.content += '<span><span class="tacticSelect" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '">Select</span><span class="tacticUnselect display-hide" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '">Unselect</span></span>';
                _group.content += '<span><input type="checkbox" class="tacticSelect" data-budgetID="' + data[i].BudgetID + '" data-budgetGroupID="' + data[i].BudgetGroupID + '" data-budgetLineItemId="' + data[i].BudgetLineItemID + '" data-budgetLineItemName="' + data[i].BudgetLineItemName + '" data-budgetSourceId="' + data[i].BudgetSourceID + '" data-versionId="' + data[i].BudgetVersionID + '" data-itemDetails="' + data[i] + '"></span>';
            }
            if (config.addIDs) {
                _group.content += " (ID: " + data[i].PlanID + ")";
                _group.title = "";
            }
            if (config.addCampaignGroupIDs) {
                _group.content += " (ID: " + data[i].CampaignGroupID + ")";
                _group.title = "";
            }
            groups1.push(_group)
            index++;
            //console.log('data[i][config.group.title_field] ', data[i]);
            if (element == "campaignCapabilitiesHomePage" || element == "CapabilitiesOptimization Chart" /*|| element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart"*/) {
                groups1.push({
                    id: index,
                    content: 'Plan Versions',
                    name: 'Plan Versions',
                    title: data[i][config.group.title_field],
                    groupName: data[i][config.group.name_field],
                    data: data[i],
                    style: 'width:auto;padding-right:50px'
                });
                index++;
            }
            if (data[i].IsCurrentPlan == true && element == 'visualizationFlowchart' && data[i].GroupByValue != 'campaigngroup') {
                _group.content += '<span class="badge greenbadge margin-left-10">Current Plan</span>';
            }
            if (data[i].IsPreCampaignPlan == true && element == 'visualizationFlowchart' && data[i].GroupByValue != 'campaigngroup') {
                _group.content += '<span class="badge bluebadge margin-left-10">Pre-Campaign Plan</span>';
            }
        }
    }

    //Code to assign groups to the main groups for putting groups under seperators
    for (var i = 0; i < mainGroup.length; i++) {

        var nestedArray = [];
        for (var j = 0; j < groups1.length; j++) {
            if (mainGroup[i].groupName == groups1[j].groupName) {
                nestedArray.push(groups1[j].id);
            }
        }
        mainGroup[i].nestedGroups = nestedArray;
    }
    groups1.push.apply(groups1, mainGroup);

    var month = [];
    month[1] = "January";
    month[2] = "February";
    month[3] = "March";
    month[4] = "April";
    month[5] = "May";
    month[6] = "June";
    month[7] = "July";
    month[8] = "August";
    month[9] = "September";
    month[10] = "October";
    month[11] = "November";
    month[12] = "December";
    var oneDay = 24 * 60 * 60 * 1000;
    if (typeof (currencySign) == "undefined") {
        currencySign = "";
    }

    //code for creating items array in timeline
    for (var i = 0; i < data.length; i++) {
        var item5 = visTimelineBlockContent('', 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
            [data[i].BudgetAmount, data[i].StartDate, data[i].CampaignGroupName, data[i].GroupByValueData, data[i].CampaignID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
        if (window.location.href.indexOf("Home/Index1") > -1) {
            item5 = visTimelineBlockContent('', 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                [data[i].BudgetAmount, data[i].StartDate, data[i].CampaignGroupName, data[i].GroupByValueData, data[i].CampaignID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'M'), '', '');
        }

        var _item = {
            id: items1.length,
            content: item5,
            start: data[i][config.item.start_field],
            end: data[i][config.item.end_field],
            group: groups1.find(x => x.name === data[i][config.group.content_field] && x.groupName === data[i][config.group.name_field]).id,
            title: config.item.title(config, data[i], month, oneDay),// '<div class="ganttChartTooltip"><b class="">Media Vehicle:</b> ' + data[i][13] + '<br/><b class="">Audience:</b> ' + data[i][14] + '<br/><b class="">Location:</b> ' + data[i][15] + '<br/><b class="">Period:</b> ' + data[i][4].split('-')[2] + " " + month[parseInt(data[i][4].split('-')[1])] + " " + data[i][4].split('-')[config.group.content_field] + ' - ' + data[i][5].split('-')[2] + " " + month[parseInt(data[i][5].split('-')[1])] + " " + data[i][5].split('-')[config.group.content_field] + '<br/><b class="">Duration:</b> ' + Math.round(Math.abs((new Date(data[i][4]).getTime() - new Date(data[i][5]).getTime()) / (oneDay)) + 1) + ' days<br/><b class="">Budget: </b>' + '$' + parseFloat((data[i][1]) / 1000).toFixed(2) + 'k' + '<br/><b>WorkFlow Status: </b>' + data[i][18] + '<br/><b>Budget Allocation Method: </b>' + data[i][19] + '</div>',
            style: element == "timinFlowchart" ? "color: white; background-color:#3A4F6B;border-width:1px;border-color: black;text-align:center" : "color: white; background-color: " + data[i][config.item.color_field] + ";border-width:1px;border-color: black",
            type: 'range',
            data: data[i],
            className: ''
        };
        //Code to change font color to black if block color is light
        if (data[i][config.item.color_field] == "#CCE3ED" || data[i][config.item.color_field] == "#F1F3FA") {
            //_item.style = 'color: black;background-color: ' + outData["HexColor"] +'; background-size: 20px 20px;border-width:2px;border-color:' + outData["HexColor"];
            _item.content.style = 'color:black';
        }
        if (window.location.href.indexOf("/Budget/List") > -1) {
            visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-budgetID', 'data-budgetGroupID', 'data-ProductID'],
                [data[i].BudgetAmount, data[i].StartDate, data[i].BudgetID, data[i].BudgetGroupID, data[i].ProductID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
        }
        if (window.location.href.indexOf("/Budget/Overview") > -1) {

            visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-budgetID', 'data-budgetGroupID', 'data-ProductID', 'data-budgetLineItemId', 'data-budgetLineItemName', 'data-budgetSourceId', 'data-versionId'],
                [data[i].BudgetAmount, data[i].StartUIDate, data[i].BudgetID, data[i].BudgetGroupID, data[i].ProductID, data[i].BudgetLineItemID, data[i].BudgetLineItemName, data[i].BudgetSourceID, data[i].BudgetVersionID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');

        }
        if (window.location.href.indexOf("Plan/Scenario/Settings") > -1) {
            //var itemContent = '<span class="" data-budget=' +  + ' data-startDate=' +  + ' data-tacticName="' +  + '" data-tacticID= ' +  + ' data-CatID=' +  + '></span>' + ;
            visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CATID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');

            // if ($('#showDropdown option:selected').val() == 0) {
            //     _item.style = "color: white; background-color: " + data[i].ConstraintHexColor + ";border-width:1px;border-color: black";
            // }
        }
        if (window.location.href.indexOf("Plan/PlanSettings/Overview") > -1 || window.location.href.indexOf("Plan/Scenario/Flowcharts") > -1) {
            if (data[i].BudgetAllocated == null) {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], '', '', '');
            }
            else {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
            }
        }
        if (config.metricSelection) {
            if (config.metricSelection == 'Audience Accuracy' || config.metricSelection == 'Location Accuracy') {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (currencySign + parseFloat((data[i][config.item.content_field]) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
            }
            else if (config.metricSelection.includes('Average Frequency')) {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (parseFloat((data[i][config.item.content_field])).toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')), '', '');
            }
            else if (config.metricSelection.includes('Efficiency')) {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (currencySign + parseFloat((data[i][config.item.content_field])).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')), '', '');
            }
            else if (config.metricSelection == "Effective Impressions") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (parseFloat((data[i][config.item.content_field])).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'MM'), '', '');
            }
            else if (config.metricSelection == "Media CPM") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (currencySign + ((parseFloat((data[i][config.item.content_field]))) / 1000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
            }
            else if (config.metricSelection == "Responses") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (parseFloat((data[i][config.item.content_field])).toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ''), '', '');
            }
            else if (config.metricSelection == "Media Percent") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (parseFloat((data[i][config.item.content_field])).toFixed(1).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '%'), '', '');
            }
            else if (config.metricSelection == "Total Impressions") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], ((parseFloat((data[i][config.item.content_field])) / 1000000).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'MM'), '', '');
            }
            else if (config.metricSelection == "Effective Reach") {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (currencySign + (parseFloat((data[i][config.item.content_field]))).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'k'), '', '');
            }
        }
        if (!data[i][config.item.end_field] || element == "CapabilitiesViewAllDatamartChart" || element == "CapabilitiesDataManagementChart") {
            _item.type = "point";
            // _item.style = () => `color: ${ data[i][config.item.color_field]} ; border-width: 2px; border-color:black`,
            _item.style = returnEverything('color: ${ data[i][config.item.color_field]} ; border-width: 2px; border-color:black');
                _item.content = "";
            _item.className = data[i][config.item.color_field];
        }
        if (data[i][config.item.color_field] == '#F1F1F1' || data[i][config.item.color_field] == '#DADBF2' || data[i][config.item.color_field] == '#C3C5F3' ||
            data[i][config.item.color_field] == '#FECCC6' || data[i][config.item.color_field] == '#FFFFFF' || data[i][config.item.color_field] == '#B6E2AF') {
            _item.style = "color: black; background-color: " + data[i][config.item.color_field] + ";border-width:1px;border-color: black";
        }
        //if (element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart") {
        //    var checkPostCampaignReportCount = data[i].PostCampaignReportCount;
        //    if (checkPostCampaignReportCount > 0) {
        //        _item.visibleFrameTemplate = '<div class="progress-wrapper"><span data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#myModal2" class="openExploreSpace" data-entityid="' + data[i].CampaignID + '"><button class="btn btn-sm font-size-10">' + data[i].PostCampaignReportCount +' Reports<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg></button></span></div>'
        //    }
        //}
        if (element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart" || element == "TimelineViewAllChart" || element == "TimelineCampaigns Chart") {
            var checkPostCampaignReportCount = data[i].PostCampaignReportCount;
            if (checkPostCampaignReportCount > 0) {
                _item.content = '<div class="d-flex flex-row align-items-center max-w-250"><i title="Explore Data" data-entityId=' + data[i].CampaignID + ' class="fa fa-search-plus openExploreSpace exploreCampaignDetailsLink"></i>' + _item.content.innerHTML + '</div></div > ';
                //< button style="display:flex;margin-left:0px !important" class="margin-left-0 openExploreSpace exploreCampaignDetailsLink" data - entityId="' + data[i].CampaignID + '" > <span class="exploreCampaignDetailsLink--content padding-left-5 padding-right-5p">' + data[i].PostCampaignReportCount + ' Reports</span></button > <div class="margin-left-5">'
                //_item.content = '<span data-toggle="modal" data-backdrop="false" data-keyboard="false" data-target="#myModal2" class="openExploreSpace" data-entityid="' + data[i].CampaignID + '"><button class="btn btn-sm font-size-8" style="padding:3px 5px">' + data[i].PostCampaignReportCount + ' Reports</button></span><span style="margin-left:20px">' + _item.content.innerHTML+'</span>';
            }
        }
        if (element == "timinFlowchart") {
            _item.visibleFrameTemplate = '<div class="progress-wrapper"><div class="progress" style="background: #4CD515;width:' + parseFloat(_item.data.BudgetConsumed).toFixed(2) + '%"></div><label class="progress-label">' + parseFloat(_item.data.BudgetConsumed).toFixed(2) + '%<label></div>'
            //_item.visibleFrameTemplate = '<div class="progress-wrapper"><div class="progress" style="width:' + parseFloat(data[i]["BudgetConsumed"]).toFixed(2) + '%"></div><label class="progress-label">' + parseFloat(data[i]["BudgetConsumed"]).toFixed(2) + '%<label></div>';
        }
        if (element == "dataMartTimelineHomePage") {
            _item.content = '<i class="fa fa-check"></i>';
        }
        if ((element == "visualizationFlowchart" && window.location.href.indexOf('Instance/CampaignList') != -1) || element == "CapabilitiesOptimization Chart" || element == "campaignCapabilitiesHomePage") {
            if (data[i].WorkflowStatusID == 3) {
                _item.visibleFrameTemplate = '<div class="progress-wrapper"><div class="progress" style="background: #4CD515;width:' + parseFloat(_item.data.PercentBudgetConsumed).toFixed(2) + '%"></div><label class="progress-label">' + parseFloat(_item.data.PercentBudgetConsumed).toFixed(2) + '%<label></div>';
                //_item.visibleFrameTemplate = '<div class="progress-wrapper"><div class="progress" style="width:' + parseFloat(data[i]["PercentBudgetConsumed"]).toFixed(2) + '%"></div><label class="progress-label">' + parseFloat(data[i]["PercentBudgetConsumed"]).toFixed(2) + '%<label></div>';
            }

        }
        if (config.item.numberFromat) {
            var numberFormat = numberformatFunction(_item.data.NumberFormat);
            if (numberFormat.numbeFormat.postfix == '%') {
                numberFormat.divideNumber = 0.01;
            }
            if (window.location.href.indexOf("Plan/PlanSettings/Overview") > -1) {
                if (data[i].BudgetAllocated == null) {
                    visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                        [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], '', '', '');
                    if (data[i][config.item.color_field] == "#F1F1F1") {
                        data[i][config.item.color_field] = '#dfd3d3';
                    }
                    _item.style = "color: black; border-color: " + data[i][config.item.color_field] + ";border-width:1px;background-color:transparent";
                }
                else {
                    visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                        [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (numberFormat.numbeFormat.prefix + (parseFloat(data[i][config.item.content_field]) / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix), '', '');
                }
            }
            else {
                visTimelineBlockContent(_item, 'span', 'itemFlowchart', ['data-budget', 'data-startDate', 'data-tacticID', 'data-tacticName', 'data-CATID'],
                    [data[i].BudgetAllocated, data[i].StartDate, data[i].TacticId, data[i].GroupByValueData, data[i].CatID], (numberFormat.numbeFormat.prefix + (parseFloat(data[i][config.item.content_field]) / numberFormat.divideNumber).toFixed(numberFormat.numbeFormat.decimal) + numberFormat.numbeFormat.postfix), '', '');
            }

            if (_item.content.innerHTML.includes("NaN")) {
                var item5 = document.createElement('span');
                item5.appendChild(document.createTextNode('0.00'));
                item5.className = 'itemFlowchart';
                item5.className += ' emptyItemFlowchart';
                item5.setAttribute('data-budget', data[i].BudgetAllocated);
                item5.setAttribute('data-startDate', data[i].StartDate);
                item5.setAttribute('data-tacticID', data[i].TacticId);
                item5.setAttribute('data-tacticName', data[i].GroupByValueData);
                item5.setAttribute('data-CATID', data[i].CatID);
                item5.style.color = data[i][config.item.color_field];
                _item.content = item5;
            }
        }
        config.item.handler(data[i], _item);
        items1.push(_item);
        if (element == "campaignCapabilitiesHomePage" || element == "CapabilitiesOptimization Chart" /*|| element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart"*/) {
            var planVersionList = [];
            for (var y = 0; y < data.length; y++) {
                planVersionList.push(data[y].PlanList);
            }
            for (var b in planVersionList) {
                if (i == b) {
                    if (planVersionList[b].length != 0) {
                        for (var t in planVersionList[b]) {
                            var campaignGroup, product, groupid;
                            if (element == "campaignCapabilitiesHomePage" || element == "CapabilitiesOptimization Chart") {
                                campaignGroup = data.find(x => x.CampaignID == planVersionList[b][t].CampaignId).CampaignID;
                                product = data.find(x => x.CampaignID == planVersionList[b][t].CampaignId).GroupByValueData;
                                groupid = groups1.find(x => x.content.includes(campaignGroup) && x.groupName == product).id + 1;
                            }
                            else {
                                campaignGroup = data.find(x => x.CampaignID == planVersionList[b][t].CampaignId).CampaignGroupName;
                                product = data.find(x => x.CampaignID == planVersionList[b][t].CampaignId).GroupByValueData;
                                groupid = groups1.find(x => x.content.includes(campaignGroup) && x.groupName == product).id + 1;
                            }
                            var _item = {
                                className: "",
                                content: "",
                                end: planVersionList[b][t].VersionDate,
                                group: groupid,
                                id: items1.length,
                                start: planVersionList[b][t].UIVersionDate,
                                style: "",
                                title: "<div class='ganttChartTooltip'><span><b>Plan:</b> " + planVersionList[b][t].PlanName + " <br/><span class='margin-left-36'>(ID:" + planVersionList[b][t].PlanId + ")</span><br/><b>Version Date: </b>" + planVersionList[b][t].VersionDate.split("-")[2] + "-" + planVersionList[b][t].VersionDate.split("-")[1] + "-" + planVersionList[b][t].VersionDate.split("-")[0] + "</span></div>",
                                type: "point",
                                data: planVersionList[b][t]
                            };
                            if (planVersionList[b][t].IsCurrent == true) {
                                _item.className = "darkBlue";
                            }
                            else if (planVersionList[b][t].IsPreCampaignPlan == true) {
                                _item.className = "darkgreen";
                            }
                            else {
                                _item.className = "lightBlue";
                            }
                            items1.push(_item);
                        }
                    }

                }

            }

        }
    }
    // Create a DataSet (allows two way data-binding)
    objectParameters.items = items1;
    //objectParameters.items.add(items1);

    // objectParameters.groups = new vis.DataSet(groups1);
     objectParameters.groups = groups1
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + 10);
    // Configuration for the Timeline
    objectParameters.options = {
        showCurrentTime: true,
        selectable: true,
        stack: true,
        orientation: 'top',
        type: "range",
        moveable: true,
        zoomable: true,
        zoomKey: "ctrlKey",
        width: "100%",
        margin: {
            item: {
                horizontal: -1
            }
        },
        multiselect: true,
        selectable: true,
        groupTemplate: function (group) {
            var container = document.createElement('span');
            var label = document.createElement('span');
            label.innerHTML = group?.content + ' ';
            container.insertAdjacentElement('afterBegin', label);
            return container;
        },

    };
    if (window.location.href.indexOf("Plan/PlanSettings/Overview") > -1 || window.location.href.indexOf("Plan/Campaign/Overview") > -1 || window.location.href.indexOf("Plan/Scenario/Settings") > -1) {
        //objectParameters.options.selectable = false;
        objectParameters.options.tooltip = { overflowMethod: 'cap' }
    }

    var data = false;
    var maxDate = new Date().setDate(new Date().getDate() + 10);
    Object.keys(items1).forEach(function (key) {

        // removed "TimelineViewAllChart" element from below condition due to too much future date were displayed in flowchart for homw page campaign.
        if (element == "budgetCapabilitiesHomePage" || element == "TimelineViewAllBudgetChart" || element == "TimelineBudgets Chart" || element == "TimelineCampaigns Chart" || element == "timinFlowchart" || element == 'CapabilitiesPlanningChart' || element == 'CapabilitiesViewAllMediaPlanOptimizationChart' || element == "CapabilitiesPlanningChart") {

            if (items1[key].type == 'range') {
                if (new Date(items1[key].end) > new Date(maxDate)) {
                    data = true;
                    maxDate = new Date(items1[key].end);
                    maxDate.setDate(new Date(items1[key].end).getDate());
                }
                else {
                    data = true;
                    maxDate = new Date(maxDate);
                    maxDate.setDate(new Date(maxDate).getDate());
                }
            }
            else {
                if (new Date(items1[key].start) > maxDate) {
                    data = true;
                    maxDate = new Date(items1[key].start);
                    maxDate.setDate(new Date(items1[key].start).getDate());
                }
            }
        }
        else {
            if (new Date(items1[key].end) > new Date()) {
                data = true;
                return false;
            }
        }
    });

    if (element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart" || element == "timinFlowchart" || (element == "visualizationFlowchart" && window.location.href.indexOf('Instance/CampaignList') != -1) || element == "CapabilitiesOptimization Chart" || element == "campaignCapabilitiesHomePage") {
        objectParameters.options.visibleFrameTemplate = function (item) {
            if (item.visibleFrameTemplate) {
                return item.visibleFrameTemplate;
            }
            if (item.value) {
                var percentage = item.value * 100 + '%';
                return '<div class="progress-wrapper"><div class="progress" style="background: #4CD515;width:' + (item.value * 100).toFixed(2) + '%"></div><label class="progress-label">' + (item.value * 100).toFixed(2) + '%<label></div>';
            }

        }
    }
    if (element == "TimelineViewAllBudgetChart" || element == "budgetCapabilitiesHomePage" || element == "TimelineBudgets Chart" || (element == 'visualizationFlowchartHomePage' || window.location.href.indexOf('/Instance/CampaignList') != -1) && data == false) {
        objectParameters.options.end = endDate.setDate(new Date(endDate).getDate() + 10);
    }

    if (element == "budgetCapabilitiesHomePage" || element == "TimelineViewAllBudgetChart" || element == "TimelineBudgets Chart" || element == "TimelineCampaigns Chart" || element == 'timinFlowchart' || element == 'CapabilitiesPlanningChart' || element == 'CapabilitiesViewAllMediaPlanOptimizationChart') {

        objectParameters.options.end = maxDate.setDate(new Date(maxDate).getDate() + 10);
    }
    if (config.dataFeedTimeline || element == "campaignCapabilitiesHomePage") {
        objectParameters.options.stack = false;
        objectParameters.options.zoomable = true;
    }
    if (/*element == "TimelineViewAllChart" || element == "TimelineCampaigns Chart" ||*/ element == "CapabilitiesViewAllMediaPlanOptimizationChart" || element == "CapabilitiesPlanningChart") {
        objectParameters.options.zoomable = true;
        objectParameters.options.moveable = true;
    }
    if (config.start) {
        objectParameters.options.start = config.start.startDate;
        objectParameters.options.end = config.start.endDate;
    }

    if (window.location.href.indexOf('Plan/Scenario/Flowcharts') > -1) {
        objectParameters.options.timeAxis = { scale: 'weekday', step: 0 };
        objectParameters.options.format = {
            minorLabels: {
                millisecond: 'SSS',
                second: 's',
                minute: 'HH:mm',
                hour: 'HH:mm',
                weekday: 'ddd D',
                day: 'ddd D',//this is being shown
                week: 'w',
                month: 'MMM',
                year: 'YYYY'
            },
            majorLabels: {
                millisecond: 'HH:mm:ss',
                second: 'D MMMM HH:mm',
                minute: 'ddd D MMMM',
                hour: 'ddd D MMMM',
                weekday: 'MMMM YYYY',
                day: 'MMM YYYY',//this is being shown
                week: 'MMMM YYYY',
                month: 'YYYY',
                year: ''
            },
        };
        var a = [];
        Object.keys(items1).forEach(function (key) {
            a.push(new Date(items1[key].start));
        });
        var startOfHiddenDate;
        for (var i = 0; i < a.length; i++) {
            if (new Date(a[i]).getDay() == 1) {
                startOfHiddenDate = new Date(a[i]);
                break;
            }
        }
        if (typeof (startOfHiddenDate) != 'undefined') {
            var startDate = new Date(startOfHiddenDate), endDate = new Date(startOfHiddenDate);
            startDate.setDate(new Date(startOfHiddenDate).getDate() + 1);
            endDate.setDate(new Date(startOfHiddenDate).getDate() + 7);
            var startDate1 = startDate.getDate(), endDate1 = endDate.getDate();
            var startyear = startDate.getFullYear(), endyear = endDate.getFullYear();
            var startmonth = parseInt(startDate.getMonth()) + 1, endmonth = parseInt(endDate.getMonth()) + 1;
           
        }
        else {
            var goBack = new Date(a[0]).getDay() % 7 + 6;
            var startDate = new Date(a[0]), endDate = new Date(a[0]);
            startDate.setDate(new Date(a[0]).getDate() - goBack + 1);
            endDate.setDate(new Date(a[0]).getDate() - goBack + 7);
            var startDate1 = startDate.getDate(), endDate1 = endDate.getDate();
            var startyear = startDate.getFullYear(), endyear = endDate.getFullYear();
            var startmonth = parseInt(startDate.getMonth()) + 1, endmonth = parseInt(endDate.getMonth()) + 1;
           
        }
    }
    if (element == 'visualizationAnalytics' || element == 'visualizationFlowchartHomePage') {
        objectParameters.options.multiselect = false;
    }
    
    if (objectParameters.options.end) {

    }
    else {
        if (element != 'dataFeedsTimelineChart' && element != 'dataMartTimelineHomePage' && element == "CapabilitiesViewAllDatamartChart" && element == "CapabilitiesDataManagementChart") {
            var arr = [];
            Object.keys(items1).forEach(function (key) {
                arr.push(new Date(items1[key].end));
            });
            objectParameters.options.end = new Date(Math.max.apply(null, arr)).getTime() + (5 * 24 * 60 * 60 * 1000);
        }
    }
    console.log(container,objectParameters ,"llksojdafah")
    // Initialize Timeline

    // if (element == 'visualizationAnalytics' /*|| element == 'timinFlowchart'*/) {
    //     objectParameters.timeline = new vis.Timeline(container, objectParameters.items, objectParameters.options);
    // } else {
    //     objectParameters.timeline = new vis.Timeline(container, objectParameters.items, objectParameters.groups, objectParameters.options);
    // }
    //code to load large data charts which were not loading
    // if (element != 'timinFlowchart') {
    //     objectParameters.timeline.moveTo(0, { animation: false });
    // }
    return objectParameters;
}

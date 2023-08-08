import { useState, useEffect } from 'react'
import PlotlyComponent from '../plotly/plotlycomponent'

export default function TabCompoent(props) {
    const listingData = props.timelineJsondata
    const [selectedTab, setSelectedTab] = useState(props.timelineJsondata[0])
    const [listData, setListData] = useState(listingData)

    useEffect(()=>{
        let listJsonData = [...listingData];
        if(selectedTab == 'View All'){
            setListData(listingData)  
        }else{
            listJsonData = listJsonData.filter(item=>{
                if(item == selectedTab){
                    return item
                }
            })
            setListData(listJsonData)  
        }
        
        
    },[selectedTab])

    return (
        <div className='mt-3'>
            {props.timelineJsondata.map((item, index) => {
                return <span className='marginLeft10'><button onClick={() => setSelectedTab(item)} type="button" className={item == selectedTab ? "btn selectedTabFilter" : "btn  btn-light"}>{item}</button></span>
            })}


            <div className='m-2 mt-5'>
            {listData.map((item, index) => {
                return  (
                <div className="card mb-3">
                <div className="card-body">
                   {/* {item == 'budget' ? <PlotlyComponent/>  : item} */}
                   {item}
                </div>
            </div>)
            })}
               
            </div>
        </div>
    )
}

import { useState, useEffect } from 'react'
import PlotlyComponent from '../plotly/plotlycomponent'

export default function TabCompoent(props) {
    const listingData = props.timelineJsondata
    const [selectedTab, setSelectedTab] = useState(props.timelineJsondata[0])
    const [listData, setListData] = useState(listingData)
    const [selectedCard, setSelectedCard] = useState('')

    // FIRST TIME RENDER AND selectedTab changes run
    useEffect(() => {
        let listJsonData = [...listingData];
        if (selectedTab == 'View All') {
            setListData(listingData)
        } else {
            listJsonData = listJsonData.filter(item => {
                if (item == selectedTab) {
                    return item
                }
            })
            setListData(listJsonData)
        }
    }, [selectedTab])

    return (
        <div className='mt-3'>
            {props.timelineJsondata.map((item, index) => {
                return <span className='marginLeft10'><button onClick={() => setSelectedTab(item)} type="button" className={item == selectedTab ? "btn selectedTabFilter" : "btn  btn-light"}>{item}</button></span>
            })}
            <div className='mt-5'>
                {listData.map((item, index) => {
                    return (
                        <div className="card  shadow-sm p-3 mb-5 bg-white rounded">
                            <div className="card-body ">

                                {/* {item == 'budget' ? <PlotlyComponent/>  : item} */}
                                {item}
                                <div class="d-flex justify-content-between">
                                    <div></div>
                                    <div></div>
                                    <div>
                                    <button
                                            className="btn btn-light"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#${item}`}
                                            aria-expanded="false"
                                            aria-controls={item}
                                            // onClick={()=>setSelectedCard(item)}
                                        >
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
</svg>   View More
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <p>
                                        
                                    </p>
                                    <div className={selectedCard == item ? "collapse show": "collapse" } id={item}>
                                      
                                    </div>
                                </div>

                            </div>
                        </div>)
                })}
            </div>
        </div>
    )
}

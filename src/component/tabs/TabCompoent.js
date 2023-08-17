
import { useState, useEffect } from 'react'
import VisCompoent from '../vis/VisCompoent';
import './tabs.scss'

export default function TabCompoent(props) {
    const listingData = props.timelineJsondata
    const [selectedTab, setSelectedTab] = useState(props.timelineJsondata[0]);
    const [listData, setListData] = useState(listingData);
    const [selectedCardId, setSelectedCardId] = useState('');
    const [show, setShow] = useState(false);


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

    //HIDE AND CLOSE FUNCTIONILTY 
    const collapseMenuFunction = (id) => [
        setSelectedCardId(id),
        setShow(!show)
    ]
    return (
        <div className='mt-3'>
            {props.timelineJsondata.map((item, index) => {
                return <span className='marginLeft10'><button onClick={() => setSelectedTab(item)} type="button" className={item == selectedTab ? "btn selectedTabFilter" : "btn  btn-light"}>{item}</button></span>
            })}
            <div className='mt-5'>
                {listData.map((item, index) => {
                    if (item !== "View All")
                        return (
                            <div className="card  shadow-sm p-3 mb-5 bg-white rounded embed-responsive-21by9">
                                <div className="card-body ">
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                                                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                                            </svg> {item}
                                        </div>
                                        <div style={{ width: '30%' }}>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <span className='captionCss'>567767.6M</span>
                                                    <span className='text-secondary fontSize10'> Total Budget Amount </span>
                                                </div>
                                                <div></div>
                                                <div>
                                                    <span className='captionCss'>567</span>
                                                    <span className='text-secondary fontSize10'> # of Budgets </span>
                                                </div>
                                                <div>
                                                    <span className='captionCss'>567</span>
                                                    <span className='text-secondary fontSize10'> # of Budgets </span>
                                                </div>
                                            </div>

                                        </div>

                                        <div></div>
                                        <div>
                                            <button
                                                className="btn btn-light"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#${item}`}
                                                aria-expanded="false"
                                                aria-controls={item}
                                                onClick={() => collapseMenuFunction(item)}
                                            >




                                                {selectedCardId == item && show ?
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
                                                        </svg>
                                                        View less
                                                    </span>
                                                    :
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down" viewBox="0 0 16 16">
                                                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z" />
                                                        </svg>
                                                        View More
                                                    </span>
                                                }
                                            </button>
                                        </div>
                                    </div>
                                    <div className={selectedCardId == item && show ? "collapse show" : "collapse"} >
                                        <div className='embed-responsive-21by9'>
                                            <VisCompoent />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                })}
            </div>
        </div>
    )
}

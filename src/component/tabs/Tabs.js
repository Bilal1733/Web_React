import {useState} from 'react';
import './tabs.scss'
import { response } from './data';
import TabCompoent from './TabCompoent';


export default function Tabs() {
    const [selectedTab , setSelectedTab] = useState(response?.tabsName[0]?.name)
    // Timeline data
    const timelineJsondata = ["View All" ,"budget" ,"Campaign"]
    const timelineJsondata2 = ["View All" ,"Strategy & Research" ,"Measurement","Planning","Optimization","Data Management","Configuration"]

    return (
        <div>
            <ul className="nav nav-tabs">
                {response?.tabsName?.map((item, index) => {
                    return <li className={item.name === selectedTab ? "nav-item activeTabClass" : "nav-item"}  key={index}>
                        <a className="nav-link " aria-current="page" onClick={()=>setSelectedTab(item.name)} href="#">
                            {item.name}
                        </a>
                    </li>
                })}
            </ul>
            {selectedTab === "Timeline" &&
            <div> 
                <TabCompoent timelineJsondata={timelineJsondata} />
            </div>
            }
            {selectedTab === "Capabilities" &&
            <div> 
                <TabCompoent timelineJsondata={timelineJsondata2} />
            </div>
            }
        </div>
    )
}

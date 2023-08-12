import {useState} from 'react';
import './tabs.scss'
import { response } from './data';
import TabCompoent from './TabCompoent';


export default function Tabs() {
    const [selectedTab , setSelectedTab] = useState(response?.tabsName[0]?.name)
    // Timeline data
    const timelineJsondata = ["View All" ,"budget" ,"Campaign"]
    console.log(selectedTab)
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
                This is capabilities tab
            </div>
            }
        </div>
    )
}

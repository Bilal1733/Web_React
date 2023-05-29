import React, { useState } from 'react';
import '../styles/home.scss'
import Header from './Header';

const Home = () => {
    const [tabData, setTabData] = useState('timeline');
    return(
        <>
        <Header />
            <div id="home"  className="container-fluid ps-5 pe-5 pt-3 pb-3">
                <div>this is home</div>
                <div className='navtabs-component mt-3'>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={`${tabData === 'timeline' && 'active'} nav-link`} aria-current="page" onClick={() => setTabData('timeline')}>Timeline</a>
                        </li>
                        <li className="nav-item">
                            <a className={`${tabData === 'capabilities' && 'active'} nav-link`}  onClick={() => setTabData('capabilities')}>Capabilities</a>
                        </li>
                    </ul>
                    {tabData=== 'timeline' && 
                        <div id="timeline" className='mt-3'>
                            this is timeline
                        </div>
                    }
                    {tabData === 'capabilities' && 
                        <div id="capabilities" className="mt-3">
                            this is capabilities
                        </div>
                    }
                </div>
            </div>
        </>
        
    )
}

export default Home;
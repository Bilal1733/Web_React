import React, { useState } from 'react';
import Header from '../components/Header';
import Tabs from './tabs/Tabs';
import Sidebar from './sidebar/Sidebar';

const Home = () => {
  const [show, setShow] = useState(false);
  
  return (
    <div>
      <Header setShow={setShow} show={show}/>
          <div className='row m-2'>
            <div className='col-sm-12 col-md-3 order-1 order-md-2'>
              <Sidebar show={show} />
            </div>
            <div className='col-sm-12 col-md-9 order-2 order-md-1'>  
            <div className='mt-3'>
              <span className='captionCss fontSize10'>Platform for Media Buyers POC</span>
              <h4>Elsy Dev Instance</h4>
            </div>
            
              <Tabs/>
            </div>
               </div>
          </div> 
  );
};

export default Home;

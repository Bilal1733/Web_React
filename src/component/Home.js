import React, { useState } from 'react';
import Header from '../components/Header';
import Tabs from './tabs/Tabs';
import Sidebar from './sidebar/Sidebar';

const Home = () => {
  const [show, setShow] = useState(false);
  
  return (
    <div className='container-fluid'>
      <Header setShow={setShow} show={show} />
      <div className='row'>
        <div className='col-sm-12 col-md-3 order-1 order-md-2'>
          <Sidebar show={show} />
        </div>
        <div className='col-sm-12 col-md-9 order-2 order-md-1'>
          <Tabs />
        </div>
      </div>
    </div>
  );
};

export default Home;

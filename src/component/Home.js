import React, { useState } from 'react'
// import PlotlyComponent from './plotly/plotlycomponent'
// import PlotlyIndex from './plotly/plotlyIndex'
// import VisCompoent from './vis/VisCompoent'
import Header from '../components/Header'
import Sidebar from './sidebar/Sidebar'

const Home = () => {
  const [show,setShow] = useState(false);
  return (
    <div>
      <Header setShow={setShow} show={show}/>
      {/* <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-8'></div>
            <div className='col-sm-12 col-md-4'></div>
          </div>
      </div> */}
    {/* <VisCompoent/> */}
      {/* <PlotlyIndex/> */}
      <Sidebar show={show} />
    </div>
  )
}

export default Home

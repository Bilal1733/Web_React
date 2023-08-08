import React from 'react'
// import PlotlyComponent from './plotly/plotlycomponent'
// import PlotlyIndex from './plotly/plotlyIndex'
// import VisCompoent from './vis/VisCompoent'
import Header from '../components/Header'
import Sidebar from './sidebar/Sidebar'

const Home = () => {
  return (
    <div>
      <Header />
      {/* <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-8'></div>
            <div className='col-sm-12 col-md-4'></div>
          </div>
      </div> */}
    {/* <VisCompoent/> */}
      {/* <PlotlyIndex/> */}
      <Sidebar />
    </div>
  )
}

export default Home

import React from 'react'
import PlotlyComponent from './plotly/plotlycomponent'
import PlotlyIndex from './plotly/plotlyIndex'
import VisCompoent from './vis/VisCompoent'
import Header from '../components/Header'

const Home = () => {
  return (
    <div>
      <Header />
      <div className='container'>
          <div className='row'>
            <div className='col-sm-12 col-md-8'></div>
            <div className='col-sm-12 col-md-4'>side bar</div>
          </div>
      </div>
    {/* <VisCompoent/> */}
      {/* <PlotlyIndex/> */}
    </div>
  )
}

export default Home

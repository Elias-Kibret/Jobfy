import React, { useState } from 'react'
import BarchartComponent from './BarchartComponent'
import AreaChartComponent from './AreaChartComponent'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/ChartsContainer'
const ChartsContainer = () => {
   const [barChart,setBarChart]=useState(true)
  const {monthlyApplications:data}=useAppContext()
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type="button" onClick={() => setBarChart(!barChart)}>
        {barChart?'Area Chart': 'Bar Chart'}
      </button>
      {barChart?<BarchartComponent data={data} />: <AreaChartComponent data={data}/>}
    
    </Wrapper>
  )
}
export default ChartsContainer
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
const BarChartComponent = ({data}) => {
  return (
      <ResponsiveContainer>
          <BarChart data={data} margin={{ tiop: 50 }}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey={data.count} fill='#2cb1bc' barSize={75}/>
          </BarChart>
    </ResponsiveContainer>
  )
}
export default BarChartComponent
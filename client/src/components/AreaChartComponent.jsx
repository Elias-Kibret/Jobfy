import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
  } from 'recharts'
const AreaChartComponent = ({data}) => {
  return (
      <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 50 }}>
              <CartesianGrid strokeDasharray='3 3'/>
              <XAxis data='date' />
              <YAxis allowDecimals={true} />
              <Tooltip />
              <Area type="monotone" dataKey="count" stroke='#2cb1bc' fill="#bef8fd"/>
          </AreaChart>
          
</ResponsiveContainer>
  )
}
export default AreaChartComponent
import {BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'

const BarchartComponent = ({data}) => {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ tiop: 50 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='date' />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey='count' fill='#2cb1bc' barSize={75}/>
            </BarChart>
      </ResponsiveContainer>
    )
}
export default BarchartComponent


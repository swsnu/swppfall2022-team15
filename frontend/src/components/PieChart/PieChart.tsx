import { PieChart, Pie, Cell, Legend } from 'recharts';

import { NotificationType } from '../../types';

function NotiPieChart(props: { notifications: NotificationType[] }) {
    //Todo: Implement PieChart with actual data

    //Implemented with mock data
    const COLORS = ['#00ff00', '#ff0000'];
    const mockData = [
        {
            name: "SUCCESS",
            value: 6,
        },
        {
            name: "FAILURE",
            value: 2,
        }
    ]
    
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={mockData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
            >
                {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Legend />
        </PieChart>
    )
}

export default NotiPieChart;
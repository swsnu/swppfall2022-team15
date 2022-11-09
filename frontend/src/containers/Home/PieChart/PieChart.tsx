import Chart from "react-apexcharts";

import { NotificationType } from '../../types';

function NotiPieChart(props: { notifications: NotificationType[] }) {
    //Todo: Implement PieChart with actual data

    //Implemented with mock data
    const COLORS = ['#00ff42', '#ff4842'];

    function getValues():number[] {
        if(props.notifications.length === 0) {
            return [0, 0];
        }
        else {
            let success = 0;
            for(let i = 0; i < props.notifications.length; i++) {
                if(props.notifications[i].status === "SUCCESS") {
                    success++;
                }
                
            }
            return [success, props.notifications.length - success];
        }
    }
    var values:number[] = getValues();
    const labels = ['Sent', 'Failed'];
    
    return (
        <div>
            <Chart
                type="pie"
                series={values}
                options={{
                    labels: labels,
                    colors: COLORS,
                    legend: {
                        show: true,
                        position: 'bottom',
                        horizontalAlign: 'center',
                        fontSize: '14px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        formatter: function (val: string, opts: any) {
                            return val + " - " + opts.w.globals.series[opts.seriesIndex]
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function (val: string, opts: any) {
                            return opts.w.globals.labels[opts.seriesIndex]
                        },
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            colors: ['#fff']
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 200
                            },
                            legend: {
                                position: 'bottom'
                            }
                        }
                    }]
                }}

            />

        </div>
    )

}

export default NotiPieChart;
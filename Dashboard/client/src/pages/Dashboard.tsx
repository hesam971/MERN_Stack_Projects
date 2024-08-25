import { useState, useEffect } from 'react'
import axios from 'axios';
import { AreaChart, BarChart, DonutChart, Legend } from '@tremor/react';
import Accordion from './Accordion';
import SideBar from './SideBar'




const sales = [
  { name: 'New York', sales: 980 },
  { name: 'London', sales: 456 },
  { name: 'Hong Kong', sales: 390 },
  { name: 'San Francisco', sales: 240 },
  { name: 'Singapore', sales: 190 },
  { name: 'Tokyo', sales: 680 },
];


const valueFormatter = (number: number) =>
  `$ ${Intl.NumberFormat('us').format(number).toString()}`;


function Dashboard() {
  const [data, setData] = useState([])
  const [barChart, setBarChart] = useState([])

  const readData = () => {
    axios.get('http://localhost:3000')
      .then(async (response) => {
        // handle
        setData(response.data)
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    readData()
  }, [])

  const areadataFormatter = (number:number) =>
    `$${Intl.NumberFormat('us').format(number).toString()}`;

  const readBarChartData = () => {
    axios.get('http://localhost:3000/BarChartData')
      .then(async (response) => {
        // handle
        setBarChart(response.data)
      })
      .catch( (error) => {
        // handle error
        console.log(error);
      });
  }

  useEffect(() => {
    readBarChartData()
  }, [])

  const bardataFormatter = (number: number) =>
    Intl.NumberFormat('us').format(number).toString();

  return (
    <>
    <SideBar/>

    <div className="p-12 sm:ml-64">
      <div className="p-12 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

            <AreaChart
              className="h-80"
              data={data}
              index="date"
              categories={['SolarPanels', 'Inverters']}
              colors={['indigo', 'rose']}
              valueFormatter={areadataFormatter}
              yAxisWidth={60}
              onValueChange={(v) => console.log(v)}
            />

            <BarChart
              data={barChart}
              index="name"
              categories={['Number of threatened species']}
              colors={['blue']}
              valueFormatter={bardataFormatter}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />

            <div className="flex items-center justify-center space-x-6">
              <DonutChart
                data={sales}
                category="sales"
                index="name"
                valueFormatter={valueFormatter}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia','green']}
                className="w-40"
              />
              <Legend
                categories={[ 'New York', 'London', 'Hong Kong', 'San Francisco', 'Singapore','Tokyo' ]}
                colors={['blue', 'cyan', 'indigo', 'violet', 'fuchsia','green']}
                className="max-w-xs"
              />
            </div>
 
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">

          <Accordion/>

          </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
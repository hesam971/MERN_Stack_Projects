import { useState, useEffect } from 'react'
import axios from 'axios';
import { AreaChart, BarChart, DonutChart, Legend, LineChart, EventProps } from '@tremor/react';
import { Accordion, AccordionBody, AccordionHeader, AccordionList } from '@tremor/react';



const barchartdata = [
  { name: 'Amphibians', 'Number of threatened species': 2488 },
  { name: 'Birds', 'Number of threatened species': 1445 },
  { name: 'Crustaceans', 'Number of threatened species': 743 },
  { name: 'Ferns', 'Number of threatened species': 281 },
  { name: 'Arachnids', 'Number of threatened species': 251 },
  { name: 'Corals', 'Number of threatened species': 232 },
  { name: 'Algae', 'Number of threatened species': 98 },
  { name: 'Mammals', 'Number of threatened species': 1207 },
  { name: 'Reptiles', 'Number of threatened species': 974 },
  { name: 'Fish', 'Number of threatened species': 2023 },
  { name: 'Insects', 'Number of threatened species': 812 },
  { name: 'Molluscs', 'Number of threatened species': 1345 },
  { name: 'Plants', 'Number of threatened species': 5621 },
  { name: 'Mosses', 'Number of threatened species': 189 },
  { name: 'Lichens', 'Number of threatened species': 73 },
  { name: 'Fungi', 'Number of threatened species': 305 },
  { name: 'Conifers', 'Number of threatened species': 523 },
  { name: 'Bats', 'Number of threatened species': 402 },
  { name: 'Butterflies', 'Number of threatened species': 618 },
  { name: 'Sharks', 'Number of threatened species': 454 },
  { name: 'Rays', 'Number of threatened species': 189 },
  { name: 'Sea Turtles', 'Number of threatened species': 101 },
  { name: 'Beetles', 'Number of threatened species': 329 },
  { name: 'Dragonflies', 'Number of threatened species': 203 },
  { name: 'Sea Snakes', 'Number of threatened species': 87 },
  { name: 'Cacti', 'Number of threatened species': 1267 },
  { name: 'Orchids', 'Number of threatened species': 1524 },
  { name: 'Frogs', 'Number of threatened species': 2089 },
  { name: 'Salamanders', 'Number of threatened species': 367 },
  { name: 'Ants', 'Number of threatened species': 157 }
];


const bardataFormatter = (number: number) =>
  Intl.NumberFormat('us').format(number).toString();

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

const lineChartdata = [
  { date: 'Jan 22', SolarPanels: 2890, Inverters: 2338 },
  { date: 'Feb 22', SolarPanels: 2756, Inverters: 2103 },
  { date: 'Mar 22', SolarPanels: 3322, Inverters: 2194 },
  { date: 'Apr 22', SolarPanels: 3470, Inverters: 2108 },
  { date: 'May 22', SolarPanels: 3475, Inverters: 1812 },
  { date: 'Jun 22', SolarPanels: 3129, Inverters: 1726 },
  { date: 'Jul 22', SolarPanels: 3490, Inverters: 1982 },
  { date: 'Aug 22', SolarPanels: 2903, Inverters: 2012 },
  { date: 'Sep 22', SolarPanels: 2643, Inverters: 2342 },
  { date: 'Oct 22', SolarPanels: 2837, Inverters: 2473 },
  { date: 'Nov 22', SolarPanels: 2954, Inverters: 3848 },
  { date: 'Dec 22', SolarPanels: 3239, Inverters: 3736 },
  { date: 'Jan 23', SolarPanels: 3300, Inverters: 3550 },
  { date: 'Feb 23', SolarPanels: 3105, Inverters: 3450 },
  { date: 'Mar 23', SolarPanels: 3700, Inverters: 3650 },
  { date: 'Apr 23', SolarPanels: 3550, Inverters: 3250 },
  { date: 'May 23', SolarPanels: 3600, Inverters: 3100 },
  { date: 'Jun 23', SolarPanels: 3500, Inverters: 3050 },
  { date: 'Jul 23', SolarPanels: 3900, Inverters: 3200 },
  { date: 'Aug 23', SolarPanels: 3200, Inverters: 3250 },
  { date: 'Sep 23', SolarPanels: 3100, Inverters: 3550 },
  { date: 'Oct 23', SolarPanels: 3250, Inverters: 3750 },
  { date: 'Nov 23', SolarPanels: 3350, Inverters: 4000 },
  { date: 'Dec 23', SolarPanels: 3500, Inverters: 4200 },
  { date: 'Jan 24', SolarPanels: 3600, Inverters: 4400 },
  { date: 'Feb 24', SolarPanels: 3400, Inverters: 4300 },
  { date: 'Mar 24', SolarPanels: 3800, Inverters: 4500 },
  { date: 'Apr 24', SolarPanels: 3650, Inverters: 4150 },
  { date: 'May 24', SolarPanels: 3700, Inverters: 4000 },
  { date: 'Jun 24', SolarPanels: 3600, Inverters: 3900 },
  { date: 'Jul 24', SolarPanels: 4000, Inverters: 4050 },
  { date: 'Aug 24', SolarPanels: 3300, Inverters: 4100 },
  { date: 'Sep 24', SolarPanels: 3200, Inverters: 4400 },
  { date: 'Oct 24', SolarPanels: 3350, Inverters: 4600 },
  { date: 'Nov 24', SolarPanels: 3450, Inverters: 4800 },
  { date: 'Dec 24', SolarPanels: 3600, Inverters: 5000 },
  { date: 'Jan 25', SolarPanels: 3700, Inverters: 5200 },
  { date: 'Feb 25', SolarPanels: 3500, Inverters: 5100 },
  { date: 'Mar 25', SolarPanels: 3900, Inverters: 5300 },
  { date: 'Apr 25', SolarPanels: 3750, Inverters: 4950 },
  { date: 'May 25', SolarPanels: 3800, Inverters: 4800 },
  { date: 'Jun 25', SolarPanels: 3700, Inverters: 4700 },
  { date: 'Jul 25', SolarPanels: 4100, Inverters: 4850 },
  { date: 'Aug 25', SolarPanels: 3400, Inverters: 4900 },
  { date: 'Sep 25', SolarPanels: 3300, Inverters: 5200 },
  { date: 'Oct 25', SolarPanels: 3450, Inverters: 5400 },
  { date: 'Nov 25', SolarPanels: 3550, Inverters: 5600 },
  { date: 'Dec 25', SolarPanels: 3700, Inverters: 5800 },
];


const dataFormatter = (number:number) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;



function Dashboard() {
  const [value, setValue] = useState<EventProps>(null);
  const [data, setData] = useState([])

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

  return (
    <>
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span className="sr-only">Open sidebar</span>
      <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
    </button>

    <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                      <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                      <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span className="ms-3">Dashboard</span>
                </a>
            </li>
            <li>
                <a href="/todoList" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                      <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">ToDo List</span>
                </a>
            </li>
            <li>
                <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                      <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Calculator</span>
                </a>
            </li>
            <li>
                <a href="/gallery" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                  <svg className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                      <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Gallery</span>
                </a>
            </li>
          </ul>
      </div>
    </aside>

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
              data={barchartdata}
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

          <LineChart
            className="h-80"
            data={lineChartdata}
            index="date"
            categories={['SolarPanels', 'Inverters']}
            colors={['indigo', 'rose']}
            valueFormatter={dataFormatter}
            yAxisWidth={60}
            onValueChange={(v) => console.log(v)}
          />


          <AccordionList>
              <Accordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 1</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </Accordion>
              <Accordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 2</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </Accordion>
              <Accordion>
                <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Accordion 3</AccordionHeader>
                <AccordionBody className="leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                  tempor lorem non est congue blandit. Praesent non lorem sodales,
                  suscipit est sed, hendrerit dolor.
                </AccordionBody>
              </Accordion>
            </AccordionList>
          </div>
      </div>
    </div>
    </>
  )
}

export default Dashboard
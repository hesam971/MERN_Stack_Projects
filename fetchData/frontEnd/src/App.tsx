import { useEffect, useState } from 'react'
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

type personalInformation = {
  name: string,
  email: string,
  address: string

}

function App() {

  const [data, setData] = useState<personalInformation[]>([])

  const readData = () => {
    axios.get<personalInformation[]>('http://localhost:8080/')
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


  return (
    <>
    <div className="container mt-5">
      <h1 className="mb-4">Data from Backend</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default App

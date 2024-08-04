import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios, { AxiosResponse } from 'axios';

type params = {
  id: string
}

function Dashboard() {


  const { id } = useParams<params>()
  const [user, setUser] = useState()
  const [sport, setSport] = useState()
  
  const handleUserId = async () => {

    const response: AxiosResponse = await axios.get(`http://localhost:3000/dashboard/${id}`);
    setUser(response.data.username)
    setSport(response.data.sport)

  }

  useEffect(() => {
    
    handleUserId()

  }, [id])


  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <h2>Hello {user}</h2>
      <img src= {sport} height="300px" width="300px" />
    </div>
  )
}

export default Dashboard
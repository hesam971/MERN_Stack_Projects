import { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';


type UserInformation = {
  username: string,
  lastname: string,
  email: string
}

function create() {
  const [username, setUsername] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [userInformation, setUserInformation]  = useState<UserInformation[]>([])
  const [error, setError] = useState('')

  const addNewUser = () => {
    if(!username || !lastname || !email){
      setError('please fill all the inputs')
    }else{
      const newUser = { username, lastname , email }
      clearData()
      const sendData = async () => {
        try {
          await axios.post('http://localhost:3000/new_user', newUser);

        } catch(error){
          if(error instanceof Error){
            setError(error.message)
            }
        }
        
        };

        sendData();
    }

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse = await axios.get('http://localhost:3000/');
        const responseData = response.data.message;
        setUserInformation(responseData)
      } catch(error){
        if(error instanceof Error){
          setError(error.message)
          }
      }
      
      };

      fetchData();
  }, [])
  
  const clearData = () => {
    setUsername('')
    setLastname('')
    setEmail('')
  }

  const editUserInformation = () => {
    console.log('edit')
  }

  const deleteUserInformation = async (email: string) => {
    try {
      await axios.delete('http://localhost:3000/delete', { data: {email} });
  
    } catch(error){
      if(error instanceof Error){
        setError(error.message)
      }
    }
  };
  


  return (
    <>
       
        <div>
          <div>
            <h1> Make your CRUD list </h1>
            {error? error : ' '}
            <br />
            <label htmlFor="">First Name: </label>
            <input type="text" value={username} onChange={(prev) => setUsername(prev.target.value)} />
            <br />
            <label htmlFor="">Last Name: </label>
            <input type="text" value={lastname} onChange={(prev) => setLastname(prev.target.value)} />
            <br />
            <label htmlFor="">Email: </label>
            <input type="email" value={email} onChange={(prev) => setEmail(prev.target.value)} />
            <br />
            <button onClick={addNewUser}>Add newone</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody> 
              {userInformation.map((user, index) => (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                    {user.username? 
                    <>
                      <td><button onClick={editUserInformation}>Edit</button></td>
                      <td><button onClick={() => deleteUserInformation(user.email)}>Delete</button></td>
                    </> : null}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      
    </>
  )
}

export default create
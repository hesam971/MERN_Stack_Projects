import { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios, { AxiosResponse } from 'axios';
import {REACT_API_PIXABAY_KEY} from '../config/PixabayApi'
import SideBar from './SideBar'

function Gallery() {

  interface PicInfo {
    previewURL: string;
    user: string;
    views: number;
    downloads: number;
    likes: number;
    tags: string
  }
  
  const [picInfo, setPicInfo] = useState<PicInfo[]>([]);
  const [search, setSearch] = useState('')

  useEffect(() => {

    const fetchData = async () => {
      const response: AxiosResponse = await axios.get(`https://pixabay.com/api/?key=${REACT_API_PIXABAY_KEY}&q=${search}&image_type=photo`);
      setPicInfo(response.data.hits)
    }
    fetchData()
    
  }, [search])


  return (
    <>
    <SideBar/>
    <h1>
      Picture Gallery
    </h1>

    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
    <button> Search </button>

    {picInfo.map((item, index) => (
    <div className="card" style={{ width: '18rem' }} key={index}>
      <img className="card-img-top" src={item.previewURL} alt="Card image cap" />
      <div className="card-body">
        <h5 className="card-title">picture by: {item.user}</h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">views: {item.views}</li>
        <li className="list-group-item">downloads: {item.downloads}</li>
        <li className="list-group-item">likes: {item.likes}</li>
      </ul>
      <div className='d-inline'>
          tags: {item.tags.split(',').map((tag) => (
            <span className="badge rounded-pill bg-secondary" key={tag}>#{tag}</span>
          ))}
        </div>
    </div>
    ))}
  </>
  )
}

export default Gallery
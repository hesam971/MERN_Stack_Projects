import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios, { AxiosResponse } from 'axios';
import { REACT_API_PIXABAY_KEY } from '../config/PixabayApi';
import SideBar from './SideBar';

function Gallery() {
  interface PicInfo {
    previewURL: string;
    user: string;
    views: number;
    downloads: number;
    likes: number;
    tags: string;
  }

  const [picInfo, setPicInfo] = useState<PicInfo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response: AxiosResponse = await axios.get(
        `https://pixabay.com/api/?key=${REACT_API_PIXABAY_KEY}&q=${search}&image_type=photo`
      );
      setPicInfo(response.data.hits);
    };
    fetchData();
  }, [search]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9">
          <h1 className="text-center my-4">Picture Gallery</h1>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search for images"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary" onClick={() => setSearch(search)}>
              Search
            </button>
          </div>
          <div className="row">
            {picInfo.map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card mb-4" style={{ width: '18rem' }}>
                  <img
                    className="card-img-top"
                    src={item.previewURL}
                    alt={`Image by ${item.user}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Picture by: {item.user}</h5>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Views: {item.views}</li>
                    <li className="list-group-item">Downloads: {item.downloads}</li>
                    <li className="list-group-item">Likes: {item.likes}</li>
                  </ul>
                  <div className="card-body">
                    Tags:{' '}
                    {item.tags.split(',').map((tag) => (
                      <span className="badge rounded-pill bg-secondary me-1" key={tag}>
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gallery;

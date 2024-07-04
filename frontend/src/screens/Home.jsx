import React, { useEffect, useState } from 'react'
import Card from '../components/Card'

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');


  const loadData = async () => {
    let response = await fetch("https://quick-bite-backend.vercel.app/api/v1/fooddata", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className='carousel-caption' style={{ zIndex: "4" }}>
              <div className="d-flex justify-content-center">
                <input className="form-control me-2" type="search" placeholder="Find your next meal!" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://www.shutterstock.com/image-photo/burger-tomateoes-lettuce-pickles-on-600nw-2309539129.jpg" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=612x612&w=0&k=20&c=X6CkFGpSKhNZeiii8Pp2M_YrBdqs7tRaBytkGi48a0U=" className="d-block w-100" style={{ filter: "brightness(30%" }} alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {
          foodCat.length > 0 ? foodCat.map((data) => (
            <div className='row mb-3'>
              <div key={data._id} className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0 ? foodItem.filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLowerCase()))
                .map((filteredItem) => (
                  <div key={filteredItem._id} className='col-12 col-md-6 col-lg-4 col-xl-3'>
                    <Card foodItem={filteredItem} options={filteredItem.options[0]}/>
                  </div>
                ))
                :
                "No items for this category"}
            </div>
          ))
            :
            ""
        }
      </div>
    </div>
  )
}

// import React, { useEffect, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import Card from '../components/Card'
// // import secondimage from '../images/Img2.jpg';
// // import thirdimage from '../images/Img3.jpg';
// // import fourthimage from '../images/Img4.jpg';

// export default function Home() {
//   const [search,setSearch]=useState('');
//   const [foodCat, setFoodCat] = useState([]);
//   const [foodItem, setFoodItem] = useState([]);

//   const loadData = async () => {
//     let response = await fetch("http://localhost:5000/api/foodData", {
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     response = await response.json();
//     console.log("this is the data",response)
//     setFoodItem(response[0]);
//     setFoodCat(response[1]);
//     //console.log(response[0],response[1]); 
//   }

//   useEffect(() => {
//     loadData()
//   }, [])

//   return (
//     <div>
//       <div><Navbar /></div>
//       <div> <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" >
            
//             <div className="carousel-inner " id='carousel'>
//             <div class=" carousel-caption" style={{zIndex:"10"}}>
//                     <div className=" d-flex justify-content-center">  
//                         <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
//                         <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
//                     </div>
//                 </div>
//                 <div className="carousel-item active" >
//                     <img  src="https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=2048x2048&w=is&k=20&c=yDv5dQVMV1gl7jDlfqIVDdij6NZYKO2rG_fFPojFtak=" className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
//                 </div>
//                 <div className="carousel-item">
//                     <img src="https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
//                 </div>
//                 <div className="carousel-item">
//                     <img src="https://media.istockphoto.com/id/1847555104/photo/soya-chaap-butter-masala.jpg?s=2048x2048&w=is&k=20&c=VhwP3--_UDYLGC4dJjJc_o3fUhmVvJJPpsIRZ2o8L9E=" className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
//                 </div>
//             </div>
//             <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//             </button>
//             <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//             </button>

            
//         </div>
//         </div>
//       <div className='container'>
//         {
//           foodCat !== []
//             ? foodCat.map((data) => {
//               return (
//                 <div className='row mb-3'>
//                   <div key={data._id} className='fs-3 m-3' >
//                     {data.CategoryName}
//                   </div>
//                   <hr />
//                   {foodItem !== []
//                     ?
//                     foodItem.filter((item) => (item.CategoryName === data.CategoryName) && item.name.toLowerCase().includes(search.toLocaleLowerCase()) )
//                       .map(filterItems => {
//                         return (
//                           <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
//                             <Card foodItem={filterItems}
//                               options={filterItems.options[0]}  
//                             ></Card>
//                           </div>
//                         )
//                       })
//                     : <div>No Such Data Found</div>}
//                 </div>
//               )
//             })
//             : ""
//         }
//       </div>
//       <div><Footer /></div>
//     </div >
//   )
// }

import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // Use environment variable or direct Render URL
  const API_BASE_URL = process.env.REACT_APP_API_URL || "https://food-delivery-app-backend-24sc.onrender.com";

  const loadData = async () => {
    try {
      let response = await fetch(`${API_BASE_URL}/api/foodData`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
      // You might want to add error state handling here
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div><Navbar /></div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">  
                <input 
                  className="form-control me-2" 
                  type="search" 
                  placeholder="Search" 
                  aria-label="Search"  
                  value={search} 
                  onChange={(e) => { setSearch(e.target.value) }}
                />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active">
              <img 
                src="https://media.istockphoto.com/id/495204032/photo/fresh-tasty-burger.jpg?s=2048x2048&w=is&k=20&c=yDv5dQVMV1gl7jDlfqIVDdij6NZYKO2rG_fFPojFtak=" 
                className="d-block w-100 carousel-img" 
                style={{ filter: "brightness(30%)" }} 
                alt="Burger" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://plus.unsplash.com/premium_photo-1673439304183-8840bd0dc1bf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                className="d-block w-100 carousel-img" 
                style={{ filter: "brightness(30%)" }} 
                alt="Food" 
              />
            </div>
            <div className="carousel-item">
              <img 
                src="https://media.istockphoto.com/id/1847555104/photo/soya-chaap-butter-masala.jpg?s=2048x2048&w=is&k=20&c=VhwP3--_UDYLGC4dJjJc_o3fUhmVvJJPpsIRZ2o8L9E=" 
                className="d-block w-100 carousel-img" 
                style={{ filter: "brightness(30%)" }} 
                alt="Soya Chaap" 
              />
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
      
      <div className='container'>
        {foodCat.length > 0 ? (
          foodCat.map((data) => (
            <div key={data._id} className='row mb-3'>
              <div className='fs-3 m-3'>
                {data.CategoryName}
              </div>
              <hr />
              {foodItem.length > 0 ? (
                foodItem
                  .filter((item) => (
                    item.CategoryName === data.CategoryName && 
                    item.name.toLowerCase().includes(search.toLowerCase())
                  ))
                  .map(filterItems => (
                    <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                      <Card 
                        foodItem={filterItems}
                        options={filterItems.options[0]}  
                      />
                    </div>
                  ))
              ) : <div>No Such Data Found</div>}
            </div>
          ))
        ) : (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading food items...</p>
          </div>
        )}
      </div>
      
      <div><Footer /></div>
    </div>
  )
}
import React from 'react'
import secondimage from '../images/Img2.jpg';
import thirdimage from '../images/Img3.jpg';
import fourthimage from '../images/Img4.jpg';

export default function Carousal() {
    return (
        <div>
            
            <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" >
            
                <div className="carousel-inner " id='carousel'>
                <div class=" carousel-caption" style={{zIndex:"10"}}>
                        <form className=" d-flex justify-content-center">  
                            <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outlinr-success text-white bg-success" type="submit">Search</button>
                        </form>
                    </div>
                    <div className="carousel-item active" >
                        <img  src={secondimage} className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={thirdimage} className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src={fourthimage} className="d-block w-100 carousel-img" style={{ filter: "brightness(30%)" }} alt="..." />
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
    )
}

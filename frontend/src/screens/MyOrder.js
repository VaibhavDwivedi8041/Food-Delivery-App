// import React, { useEffect, useState } from 'react';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// export default function MyOrder() {
//     const [orderData, setorderData] = useState({});

//     const fetchMyOrder = async () => {
//         console.log(localStorage.getItem('userEmail'));
//         await fetch("http://localhost:5000/api/myOrderData", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 email: localStorage.getItem('userEmail'),
//             }),
//         }).then(async (res) => {
//             let response = await res.json();
//             console.log("my order",response);
            
//             setorderData(response);
//         });
//     };
      
//     useEffect(() => {
//         fetchMyOrder();
//     }, []);

//     return (
//         <div>
//             <div>
//                 <Navbar />
//             </div>

//             <div className="container">
//                 <div className="row">
//                     {orderData !== {} ? (
//                         Array(orderData).map((data) => {
//                             return data.orderData ? (
//                                 data.orderData.order_data
//                                     .slice(0)
//                                     .reverse()
//                                     .map((item) => {
//                                         return item.map((arrayData) => {
//                                             return (
//                                                 <div key={arrayData.id}>
//                                                     {arrayData.Order_date ? (
//                                                         <div className="m-auto mt-5">
//                                                             {data = arrayData.Order_date}
//                                                             <hr />
//                                                         </div>
//                                                     ) : (
//                                                         <div className="col-12 col-md-6 col-lg-3">
//                                                             <div
//                                                                 className="card mt-3"
//                                                                 style={{ width: "16rem", maxHeight: "360px" }}
//                                                             >
//                                                                 <img
//                                                                     src={
//                                                                         "https://adstandards.com.au/wp-content/uploads/2023/08/food_and_beverage.svg"
//                                                                     } 
//                                                                     className="card-img-top"
//                                                                     alt={arrayData.name || "Image not available"}
//                                                                     style={{ height: "120px", objectFit: "fill" }}
//                                                                 />
//                                                                 <div className="card-body">
//                                                                     <h5 className="card-title">{arrayData.name}</h5>
//                                                                     <div
//                                                                         className="container w-100 p-0"
//                                                                         style={{ height: "38px" }}
//                                                                     >
//                                                                         <span className="m-1">{arrayData.qty}</span>
//                                                                         <span className="m-1">{arrayData.size}</span>
//                                                                         <span className="m-1">{data}</span>
//                                                                         <div className="d-inline ms-2 h-100 w-20 fs-5">
//                                                                             ₹{arrayData.price}/-
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     )}
//                                                 </div>
//                                             );
//                                         });
//                                     })
//                             ) : (
//                                 ""
//                             );
//                         })
//                     ) : (
//                         ""
//                     )}
//                 </div>
//             </div>

//             <Footer />
//         </div>
//     );
// }

import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Use environment variable or direct Render URL
    const API_BASE_URL = process.env.REACT_APP_API_URL || "https://food-delivery-app-backend-24sc.onrender.com";

    const fetchMyOrder = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const userEmail = localStorage.getItem('userEmail');
            
            if (!userEmail) {
                throw new Error('User email not found. Please login again.');
            }

            console.log('Fetching orders for:', userEmail);

            const response = await fetch(`${API_BASE_URL}/api/myOrderData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userEmail,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("My order response:", data);
            
            // Handle the response structure properly
            if (data && data.orderData && data.orderData.order_data) {
                setOrderData(data.orderData.order_data);
            } else {
                setOrderData([]);
            }

        } catch (err) {
            console.error("Fetch order error:", err);
            setError(err.message || "Failed to fetch order data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-12 text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="mt-3">Loading your orders...</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="alert alert-danger" role="alert">
                                <h4 className="alert-heading">Error!</h4>
                                <p>{error}</p>
                                <hr />
                                <button 
                                    className="btn btn-outline-danger" 
                                    onClick={fetchMyOrder}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="mt-4 mb-4">My Orders</h2>
                    </div>
                    
                    {orderData.length === 0 ? (
                        <div className="col-12 text-center mt-5">
                            <h4>No orders found</h4>
                            <p className="text-muted">You haven't placed any orders yet.</p>
                        </div>
                    ) : (
                        orderData
                            .slice(0)
                            .reverse()
                            .map((item, index) => {
                                return item.map((arrayData, itemIndex) => {
                                    return (
                                        <div key={`${index}-${itemIndex}`}>
                                            {arrayData.Order_date ? (
                                                <div className="col-12">
                                                    <div className="m-auto mt-5">
                                                        <h5 className="text-center">
                                                            Order Date: {arrayData.Order_date}
                                                        </h5>
                                                        <hr />
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="col-12 col-md-6 col-lg-3 mb-3">
                                                    <div
                                                        className="card mt-3"
                                                        style={{ width: "16rem", maxHeight: "360px" }}
                                                    >
                                                        <img
                                                            src="https://adstandards.com.au/wp-content/uploads/2023/08/food_and_beverage.svg"
                                                            className="card-img-top"
                                                            alt={arrayData.name || "Food item"}
                                                            style={{ height: "120px", objectFit: "fill" }}
                                                        />
                                                        <div className="card-body">
                                                            <h5 className="card-title">{arrayData.name}</h5>
                                                            <div
                                                                className="container w-100 p-0"
                                                                style={{ height: "38px" }}
                                                            >
                                                                <span className="badge bg-secondary me-1">
                                                                    Qty: {arrayData.qty}
                                                                </span>
                                                                <span className="badge bg-info me-1">
                                                                    Size: {arrayData.size}
                                                                </span>
                                                                <div className="d-inline ms-2 h-100 w-20 fs-5 fw-bold text-success">
                                                                    ₹{arrayData.price}/-
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                });
                            })
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
}
import React, { useEffect, useState } from "react";
import lawyers from "../../../data";
import "./style.css"
import SmallCard from "../../../components/cards/SmallCard";

const ViewLawyerScreen = () => {
    const [lawyer, setLawyer] = useState({});
    //console.log(window.location.pathname[8]);
    useEffect(() => {
        setLawyer(lawyers[(parseInt(window.location.pathname[8]))]);
    }, [])
    console.log(lawyer);

    return (
        <>
            <div className="text-center">
                <h2 class="title">{lawyer.name}</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <br/>
                        {/* <img src={require("../../../components/assets/img/" + lawyer.img)} alt={lawyer.name} className="img img-fluid m-2" /> */}
                    </div>

                    <div className="col-md-6">
                        <br/>
                        <div className="alert alert-light">
                            <b class="content">{lawyer.description}</b>
                        </div>
                        {/* <p className="alert alert-info">{hotel.location}</p>
                        <div className="alert alert-info">
                            <p className="text-primary" > ${(hotel.price/diffDays(hotel.from, hotel.to)).toString().substring(0, 5)} /night</p>
                            <p className="card-text">
                                <span className="float-right">
                                    Last for {diffDays(hotel.from, hotel.to)} {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
                                </span>
                            </p>
                            <p className="text-primary" >Total ={`>`} ${hotel.price}</p>
                            <p className="card-text">Beds: {hotel.bed}</p>                            
                            <div className="alert alert-light">
                                <p>
                                    From<br/> 
                                    {moment(new Date(hotel.from)).format('MMMM Do YYYY, h:mm:ss a')} 
                                </p>
                                <p>
                                    To<br/>
                                    {moment(new Date(hotel.to)).format('MMMM Do YYYY, h:mm:ss a')} 
                                </p>
                            </div>
                            <i>Posted by {hotel.postedBy && hotel.postedBy.name}</i> */}
                        {/* </div> */}
                        {/* <button onClick={handleClick} class="btn">
                            {auth && auth.token ? "Book Now" : "Login to Book"}
                        </button> */}
                        {/* { auth && auth.token ?
                            <StripeCheckout
                                class="btn"
                                stripeKey="pk_test_51JqTp9FJc7zAE0Q2XIPIIyBtwU3IgWn2resWKxEC3FqCPGJuONx9ufRf8bK3Hmg2prVyypRSoCI1nE9EC2FdxQL200eu1iupz7"
                                token={handleToken}
                                amount={diffDays(hotel.from, hotel.to) * hotel.price * 100}
                                name={hotel.title}
                            /> : 
                            <button onClick={handleClick} class="btn">Login to book</button>
                        } */}
                        
                        {/* <button
                            onClick={handleClick}
                            className="btn btn-lg btn-primary mt-1"
                            disabled={loading || alreadyBooked}
                        >
                            {loading
                                ? "Loading..."
                                :alreadyBooked
                                ? "Already Booked"
                                : auth && auth.token
                                    ? "Book Now"
                                    : "Login to Book"}
                        </button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewLawyerScreen
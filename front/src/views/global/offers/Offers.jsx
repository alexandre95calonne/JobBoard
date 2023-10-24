import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";
import "./style/Offers_style.scss"

function DisplayOffer({ sector, contract_type, city, wage }) {
    return (
        <>
            <p>Sector : {sector}</p>
            <p>Contract type: {contract_type}</p>
            <p>City : {city}</p>
            <p>Wage : {wage} $</p>
        </>
    )
}


export default function Offers() {

    const [offers, setOffers] = useState([])
    const [currentOfferId, setCurrentId] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3002/api/offers')
            .then(response => {
                setOffers(response.data);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }, []);

    return (
        <>
            <div>
                <div className="section_padding offers">
                    <h1>List of Offers</h1>
                    <div className="offers__container">
                        {offers.map(offer => {
                            return (
                                <div key={offer._id} className="offers__card">
                                    <h3>{offer.title}</h3>
                                    <p className="description">{offer.description}</p>
                                    {currentOfferId === offer._id && <DisplayOffer {...offer} />}
                                    <button className="btn" onClick={() => {
                                        if (currentOfferId === offer._id) {
                                            setCurrentId(null)
                                        } else {
                                            setCurrentId(offer._id)
                                        }
                                    }}>
                                        {currentOfferId === offer._id ? "Show less" : "Show more"}
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
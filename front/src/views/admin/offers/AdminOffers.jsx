import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import './style/AdminOffers.scss'


export default function Offers() {

    const [offers, setOffers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentOfferId, setCurrentOfferId] = useState(null)


    const [formData, setFormData] = useState({
        title: '',
        description: '',
        contract_type: '',
        sector: '',
        wage: '',
        city: '',
    })

    const handleEditOffer = (offer) => {
        setFormData({
            title: offer.title,
            description: offer.description,
            contract_type: offer.contract_type,
            sector: offer.sector,
            wage: offer.wage,
            city: offer.city,
        })
        setCurrentOfferId(offer._id)
        setShowModal(true)
    }

    const handleUpdate = (offerId) => {
        axios.put(`http://localhost:3002/api/offer/${offerId}`, formData)
            .then(response => {
                const updatedOffer = offers.map(offer => offer._id === offerId ? response.data : offer)
                setOffers(updatedOffer)
                setShowModal(false)
            })
            .catch(error => {
                console.log("Error :", error)
            })
    }

    const button_delete = (offerId) => {

        axios.delete(`http://localhost:3002/api/offer/${offerId}`)
            .then(response => {
                setUsers(offers.filter(offer => offer._id !== offerId))
                console.log(response.data)
            })

            .catch(error => {
                console.log('Error:', error)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:3002/api/offers')
            .then(response => {
                setOffers(response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
            })
    }, [])

    return (
        <>
            <div>
                <Link to={'/admin/offer/creation'}>
                    <button className="create">Create Offer</button>
                </Link>
                <div className="section_padding offers">
                    <h1>List of Offers</h1>
                    <div className="offers__container">
                        {offers.map(offer => {
                            return (
                                <div key={offer._id} className="offers__card">
                                    <h3>{offer.title}</h3>
                                    <p>Sector : {offer.sector}</p>
                                    <p>Contract type: {offer.contract_type}</p>
                                    <p>City : {offer.city}</p>
                                    <p>Description : {offer.description}</p>
                                    <p>Wage : {offer.wage} $</p>
                                    <button onClick={() => handleEditOffer(offer)} className='edit'>Modify</button>
                                    <button onClick={() => button_delete(offer._id)} className="delete">Delete</button>
                                </div>
                            )
                        })}
                    </div>

                    {showModal && (
                        <div className='modal-overlay'>
                            <div className='modal'>
                                <h2>Edit offer infos</h2>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                                <input type="text" value={formData.sector} onChange={(e) => setFormData({ ...formData, sector: e.target.value })} />
                                <input type="text" value={formData.contract_type} onChange={(e) => setFormData({ ...formData, contract_type: e.target.value })} />
                                <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                                <input type="text" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                <input type="text" value={formData.wage} onChange={(e) => setFormData({ ...formData, wage: e.target.value })} />

                                <div className='buttons'>
                                    <button onClick={() => {setShowModal(false); setCurrentOfferId(null)}} className='cancel'>Cancel</button>
                                    <button onClick={() => handleUpdate(currentOfferId)} className='update'>Update</button>
                                </div>
                            </div>
                        </div>

                    )} 
                </div>
            </div>
        </>
    )
}
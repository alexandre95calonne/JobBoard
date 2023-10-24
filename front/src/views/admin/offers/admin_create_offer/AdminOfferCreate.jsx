import { useState } from 'react'
import axios from 'axios'
import './style/Offercreation.scss'

export default function FormOffer() {

    const [sector, setSector] = useState("")
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [wage, setWage] = useState("")
    const [contract_type, setContract_type] = useState("")
    const [title, setTitle] = useState("")

    const [showPopUp, setShowPopUp] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const offerData = {
            title: title,
            description,
            sector,
            city: city,
            contract_type: contract_type,
            wage: wage,
        }

        await axios.post("http://localhost:3002/api/offer", offerData)
        setShowPopUp(true)
        try {
            setTimeout(() => {
                setShowPopUp(false)
                window.location.href = '/'
            }, 5000)
        }

        catch (err) {
            console.error("Error with creation ", err)
        }
    }

    return (
        <section className="form-offer section_padding">
            {showPopUp && (
                <div className="overlay"></div>
            )}
            {showPopUp && (
                <div className="pop-up">
                    <p>Your request has been successfully submitted</p>
                </div>
            )}
            <form action="" onSubmit={handleSubmit}>

                <h2 className='offer-info'>Offer Information</h2>

                <div className="">
                    <div>
                        <label htmlFor="">Job Title <span>*</span></label>
                        <input type="text" required value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Contract Type : <span>*</span></label>
                        <input type="text" required value={contract_type} onChange={e => setContract_type(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Sector <span>*</span></label>
                        <input type="text" required value={sector} onChange={e => setSector(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Localisation : <span>*</span></label>
                        <input type="text" required value={city} onChange={e => setCity(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label htmlFor="">Offer description <span>*</span></label>
                    <textarea name="" id="" cols="30" rows="10" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>

                <div>
                    <label htmlFor="">Wage <span>*</span></label>
                    <textarea name="" id="" cols="30" rows="10" required value={wage} onChange={e => setWage(e.target.value)}></textarea>
                </div>

                <div className='info-req'>
                    <label><span>*</span> : Information required</label>
                </div>

                <div className='create_offer'>
                    <button type="submit">Create Offer</button>
                </div>
            </form>
        </section>
    )
}
import { useState } from 'react';
import axios from 'axios';

export default function AdminFormUser() {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")

    const [showPopUp, setShowPopUp] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const userData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            status: status
        }


        try {
            await axios.post("http://localhost:3002/api/person", userData)
            setShowPopUp(true)
            setTimeout(() => {
                setShowPopUp(false)
                window.location.href = '/'
            }, 5000)
        } catch (err) {
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

                <h2 className='offer-info'>User informations</h2>

                <div className="">
                    <div>
                        <label htmlFor="">Firstname <span>*</span></label>
                        <input type="text" required value={firstname} onChange={e => setFirstname(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Lastname <span>*</span></label>
                        <input type="text" required value={lastname} onChange={e => setLastname(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Email <span>*</span></label>
                        <input type="text" required value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Password <span>*</span></label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor="">Status <span>*</span></label>
                        <input type="text" required value={status} onChange={e => setStatus(e.target.value)} />
                    </div>
                </div>

                <div className='info-req'>
                    <label><span>*</span> : Information required</label>
                </div>

                <div className='create_offer'>
                    <button type="submit">Create User</button>
                </div>
            </form>
        </section>
    )
}
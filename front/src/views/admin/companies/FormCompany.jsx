import { useState ,useEffect } from 'react'
import axios from 'axios'

export default function FormEmployer() {
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [matchEmail, setMatchEmail] = useState(true)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState(true)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [numberEmployees, setNumberEmployees] = useState("")
    const [sector, setSector] = useState("")
    const [localisation, setLocalisation] = useState("")
    const [description, setDescription] = useState("")
    const [website, setWebsite] = useState("")

    const [showPopUp, setShowPopUp] = useState(false)

    useEffect(() => {
        if(email && confirmEmail) {
            setMatchEmail(email === confirmEmail)
        } else {
            setMatchEmail(true)
        }

        if(password && confirmPassword) {
            setMatchPassword(password === confirmPassword)
        } else {
            setMatchPassword(true)
        }
    }, [email, confirmEmail, password, confirmPassword])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(!matchEmail || !matchPassword) {
            return false
        }

        try {
            const personData = {
                firstname: firstName,
                lastname: lastName,
                email,
                password
            }

            const personResponse = await axios.post("http://localhost:3002/api/person", personData)
            const personID = personResponse.data._id

            const companyData = {
                name: companyName,
                description,
                number_employees: numberEmployees,
                sector,
                city: localisation,
                website,
                email,
                owners: [personID]
            }
            
            await axios.post("http://localhost:3002/api/company", companyData)

            setShowPopUp(true)

            setTimeout(() => {
                setShowPopUp(false)
                window.location.href = '/#/admin'
            }, 5000)

        } catch (err) {
            console.error("Error with creation ", err)
        }
    }


    return (
        <section className="form-employer section_padding">
            {showPopUp && (
                <div className="overlay"></div>
            )}
            {showPopUp && (
                <div className="pop-up">
                    <p>Your request has been successfully submitted</p>
                </div>
            )}
            <h2>Personal Information</h2>
            <form action="" onSubmit={handleSubmit}>
                <div className="name">
                    <div>
                        <label htmlFor="">FirstName <span>*</span></label>
                        <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">LastName <span>*</span></label>
                        <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)}/>
                    </div>
                </div>

                <label for="email">Email <span>*</span></label>
                <input type="email" id="email" name="email" required  value={email} onChange={e => setEmail(e.target.value)}/>

                <label for="confirmEmail">Confirm - Email <span>*</span></label>
                <input type="email" id="confirmEmail" name="confirmEmail" required value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)}/>

                {!matchEmail && <p className="notMatch">Emails do not match !</p>}

                <label htmlFor="">Password <span>*</span></label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>

                <label htmlFor="">Confirm Password <span>*</span></label>
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

                {!matchPassword && <p className="notMatch">Passwords do not match !</p>}

                <h2 className='company-info'>Company Information</h2>

                <div className="">
                    <div>
                        <label htmlFor="">Company name <span>*</span></label>
                        <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Number of employee <span>*</span></label>
                        <input type="number" required value={numberEmployees} onChange={e => setNumberEmployees(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Sector <span>*</span></label>
                        <input type="text" required value={sector} onChange={e => setSector(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Localisation <span>*</span></label>
                        <input type="text" required value={localisation} onChange={e => setLocalisation(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor="">Website (URL)<span>*</span></label>
                        <input type="url" required value={website} onChange={e => setWebsite(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label htmlFor="">Company description <span>*</span></label>
                    <textarea name="" id="" cols="30" rows="10" required value={description} onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <div className='info-req'>
                    <label><span>*</span> : Information required</label>
                </div>

                <div className='sign-up'>
                    <button type="submit" disabled={!matchEmail || !matchPassword}>CREATE</button>
                </div>
            </form>
        </section>
    )
}
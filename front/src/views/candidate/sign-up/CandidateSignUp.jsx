import { useState ,useEffect } from 'react'
import axios from 'axios'
import './style/CandidateSignUp.scss'

export default function CandidateSignUp() {
    const [email, setEmail] = useState("")
    const [confirmEmail, setConfirmEmail] = useState("")
    const [matchEmail, setMatchEmail] = useState(true)

    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [matchPassword, setMatchPassword] = useState(true)

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const [showPopUp, setShowPopUp] = useState(false)

    const [emailExists, setEmailExists] = useState(false)

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
            
            await axios.post("http://localhost:3002/api/person", personData)

            setShowPopUp(true)

            setTimeout(() => {
                setShowPopUp(false)
                window.location.href = '/#/sign'
            }, 5000)

        } catch (err) {
            console.error("Error with creation ", err)
        }
    }

    const checkEmail = async (email) => {
        try {
            const response = await axios.get(`http://localhost:3002/api/check-email?email=${email}`)
            setEmailExists(response.data.exists)
        } catch (err) {
            console.log("Error :", err)
        }
    }

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


    return (
        <section className="form-employer section_padding">
            {showPopUp && (
                <div className="overlay"></div>
            )}
            {showPopUp && (
                <div className="pop-up">
                    <p>Your profile has been successfully created</p>
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
                <input type="email" id="email" name="email" required  value={email} onChange={e => {setEmail(e.target.value)
                checkEmail(e.target.value)
                }}/>

                <label for="confirmEmail">Confirm - Email <span>*</span></label>
                <input type="email" id="confirmEmail" name="confirmEmail" required value={confirmEmail} onChange={e => setConfirmEmail(e.target.value)}/>

                {!matchEmail && <p className="notMatch">Emails do not match !</p>}

                {emailExists && <p className="notMatch">This email is alreay used</p>}

                <label htmlFor="">Password <span>*</span></label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>

                <label htmlFor="">Confirm Password <span>*</span></label>
                <input type="password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>

                {!matchPassword && <p className="notMatch">Passwords do not match !</p>}

                <div className='info-req'>
                    <label><span>*</span> : Information required</label>
                </div>

                <div className='sign-up'>
                    <button type="submit" disabled={!matchEmail || !matchPassword || emailExists}>SIGN UP</button>
                </div>
            </form>
        </section>
    )
}
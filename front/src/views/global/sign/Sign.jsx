import { useState } from "react"
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style/Sign.scss'

export default function Sign() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorMessage(null)

        try {
            const response = await axios.post('http://localhost:3002/api/login', { email, password })

            const token = response.data.token
            const role = response.data.user.status
            const userID = response.data.user.id

            localStorage.setItem('userRole', role)
            localStorage.setItem('jwt', token)
            localStorage.setItem('userID', userID)

            if (role === 'admin') {
                window.location.href = '/#/admin'
            } else if (role === 'candidate') {
                window.location.href = '/#/offers'
            } else if (role === 'employer') {
                window.location.href = '/#/employer'
                const companyResponse = await axios.get(`http://localhost:3002/api/companies`)
                console.log(userID)
                let userCompany = null;
                for (let company of companyResponse.data) {
                    if (company.owners.some(owner => String(owner._id) === userID)) {
                        userCompany = company;
                        break;
                    }
                }

                if (userCompany) {
                    localStorage.setItem('companyId', userCompany._id);
                }
            }

        } catch (err) {
            if (err.response && err.response.data) {
                setErrorMessage(err.response.data.message)
            } else {
                setErrorMessage('Error with connection')
            }
        }
    }

    return (
        <section className="sign-in section_padding">
            <h2>Connection</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
                <div className='sign-up'>
                    <button type="submit">SIGN IN</button>
                </div>
            </form>

            <Link to={'/candidate/sign-up'}>
                <p className="no-account"><i>You don't account yet ? Sign up now !</i></p>
            </Link>
        </section>
    )
}
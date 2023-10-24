import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import axios from "axios"
import FormCompany from "./FormCompany"
import './style/AdminHome.scss'


export default function AdminHome() {

    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:3002/api/companies')
            .then(response => {
                setUsers(response.data)
            })
            .catch(error => {
                console.log("Error: ", error)
            })
    }, [])


    const button_delete = (userId) => {

        axios.delete(`http://localhost:3002/api/company/${userId}`)
            .then(response => {
                setUsers(users.filter(user => user._id !== userId))
                console.log(response.data)
            })

            .catch(error => {
                console.log('Error:', error)

            })

    }

    const button_confirm = async (userId) => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: "Confirmed"
            })
        }
        await fetch(`http://localhost:3002/api/company/${userId}`, options)
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
            })
            .catch((err) => console.log(err))
    }


    return (
        <>
            <div>
                <Link to={'/admin/FormCompany'}>
                    <button className="create"> Company Creation </button>
                </Link>
                <button className="filter" onClick={() => setFilter(!filter)}>{filter ? 'Click to see all companies' : 'Click to see companies Not Confirmed'}</button>
            </div>

            <div className="section_padding companies">
                <h1>List of companies</h1>
                <div className="companies__container">
                    {users.filter(user => filter ? user.status !== 'Confirmed' : user).map(users => {
                        return (
                            <div key={users._id} className="company__card">
                                <h3>{users.name}</h3>
                                <p>Description : {users.description}</p>
                                <p>Website : <a href={users.website} className="website">{users.website}</a></p>
                                <p>City : {users.city}</p>
                                <p>Number of employee(s) : {users.number_employees}</p>
                                <p>Email : {users.email}</p>
                                <button onClick={() => button_delete(users._id)} className="deletee">Delete</button>
                                {users.status === "Not confirmed" && (
                                    <button onClick={() => button_confirm(users._id)} className="confirm">Confirm</button>
                                )}

                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

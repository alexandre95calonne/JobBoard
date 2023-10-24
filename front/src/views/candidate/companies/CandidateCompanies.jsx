import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style/Companies.scss'

export default function CandidateCompanies() {

    const [companies, setCompanies] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3002/api/companies')
            .then(response => {
                const confirmedCompanies = response.data.filter(company => company.status === "Confirmed")
                setCompanies(confirmedCompanies)
            })
            .catch(error => {
                console.log('Error with getting confirmed companies')
            })

    }, [])

    return (
        <div className="section_padding companies">
            <h1>List of companies</h1>
            <div className="companies__container">
                {companies.map(company => {
                    return (
                        <Link to={`/company/${company._id}`} key={company._id}>
                            <div key={company._id} className="company__card">
                                <h3>{company.name}</h3>
                                <p>Description : {company.description}</p>
                                <p>Website : <a href={company.website} className="website">{company.website}</a></p>
                                <p>City : {company.city}</p>
                                <p>Number of employee(s) : {company.number_employees}</p>
                                <p>Email : {company.email}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
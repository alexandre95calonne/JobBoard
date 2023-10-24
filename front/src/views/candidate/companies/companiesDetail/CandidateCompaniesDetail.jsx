import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './style/CandidateCompaniesDetail.scss'
import { Link } from 'react-router-dom'


export default function CandidateCompaniesDetail() {

    const { id } = useParams()
    const [company, setCompany] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:3002/api/company/${id}`)
            .then(response => {
                setCompany(response.data)
            })
            .catch(err => console.log(err))
    }, [id])

    if (!company) {
        return (
            <div className="section_padding">
                <p>There is no company with this id :/</p>
                <Link to="/companies"><p>Go back to Companies list</p></Link>
            </div>
        )
    }

    return (
        <div className="section_padding">
            <h2>{company.name}</h2>
            <p className='first-p'>Description : {company.description}</p>
            <p className='company-info'>Location : {company.city}</p>
            <p className='company-info'>Number of employees : {company.number_employees}</p>
            <p className='company-info'>Website : <a href={company.website}>{company.website}</a></p>


            <h4>Contact infos</h4>

            {company.owners && company.owners.length > 0 &&

                <div>
                    <p className='company-info'>{company.owners[0].firstname} {company.owners[0].lastname}</p>
                    <p className='company-info'>{company.owners[0].email}</p>

                </div>
            }

            {!company.owners || company.owners.length === 0 ? <p><i>This company has no owner</i></p> : null}

        </div>
    )
}
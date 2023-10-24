import { useState, useEffect } from 'react';
import axios from 'axios'
import './style/PersonalInfos.scss'

export default function PersonalInfos() {
    const [userInfos, setUserInfos] = useState(null)
    const [companyInfos, setCompanyInfos] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        companyName: '',
        companyCity: '',
        companyEmployees: '',
        companyWebsite: ''
    })

    const handleUpdate = () => {
        const userID = localStorage.getItem('userID')
        axios.put(`http://localhost:3002/api/person/${userID}`, formData)
            .then(response => {
                setUserInfos(response.data)

                if (userInfos && userInfos.status === 'employer' && companyInfos) {
                    axios.put(`http://localhost:3002/api/company/${companyInfos._id}`, {
                        name: formData.companyName,
                        city: formData.companyCity,
                        number_employees: formData.companyEmployees,
                        website: formData.companyWebsite
                    })
                        .then(response => {
                            setCompanyInfos(response.data)
                        })
                        .catch(error => {
                            console.log("Error : ", error)
                        })
                }

                setShowModal(false)
            })
            .catch(error => {
                console.log("Error : ", error)
            })
    }

    useEffect(() => {
        const userID = localStorage.getItem('userID')

        if (userID) {
            axios.get(`http://localhost:3002/api/person/${userID}`)
                .then(response => {
                    setUserInfos(response.data)

                    setFormData(prevState => ({
                        ...prevState,
                        firstname: response.data.firstname,
                        lastname: response.data.lastname,
                        email: response.data.email
                    }))

                    if (response.data.status === 'employer') {
                        axios.get(`http://localhost:3002/api/companies`)
                            .then(response => {
                                const selectedCompany = response.data.find(company => company.owners.some(owner => owner._id === userID))

                                setCompanyInfos(selectedCompany)

                                setFormData(prevState => ({
                                    ...prevState,
                                    companyName: selectedCompany.name,
                                    companyCity: selectedCompany.city,
                                    companyEmployees: selectedCompany.number_employees.toString(),
                                    companyWebsite: selectedCompany.website
                                }))
                            })
                            .catch(error => {
                                console.log("Error : ", error)
                            })
                    } else {
                        setFormData(prevState => ({
                            ...prevState,
                            companyName: '',
                            companyCity: '',
                            companyEmployees: '',
                            companyWebsite: ''
                        }))
                    }
                })
                .catch(error => {
                    console.log("Error : ", error)
                })
        }
    }, [])


    return (
        <section className="section_padding">
            <h2>Personal Infos</h2>

            {userInfos && (
                <div className='infos'>
                    <p>Firstname : {userInfos.firstname}</p>
                    <p>Lastname : {userInfos.lastname}</p>
                    <p>Email : {userInfos.email}</p>
                </div>
            )}

            {companyInfos && (
                <div>
                    <h2 className='company'>Company information</h2>
                    <p>Name : {companyInfos.name}</p>
                    <p>City : {companyInfos.city}</p>
                    <p>Number of employees : {companyInfos.number_employees}</p>
                    <p>City : {companyInfos.city}</p>
                    <p>Website : {companyInfos.website}</p>
                </div>
            )}

            {showModal && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Edit personal infos</h2>
                        <input type="text" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
                        <input type="text" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                        <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                        {userInfos && userInfos.status === 'employer' && (
                            <>
                                <h2>Company infos</h2>
                                <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} />
                                <input type="text" value={formData.companyCity} onChange={(e) => setFormData({ ...formData, companyCity: e.target.value })} />
                                <input type="text" value={formData.companyEmployees} onChange={(e) => setFormData({ ...formData, companyEmployees: e.target.value })} />
                                <input type="text" value={formData.companyWebsite} onChange={(e) => setFormData({ ...formData, companyWebsite: e.target.value })} />
                            </>
                        )}

                        <div className='buttons'>
                            <button onClick={() => setShowModal(false)} className='cancel'>Cancel</button>
                            <button onClick={handleUpdate} className='update'>Update</button>
                        </div>
                    </div>
                </div>

            )}

            <button onClick={() => setShowModal(true)} className='edit'>Edit infos</button>
        </section>
    )
}
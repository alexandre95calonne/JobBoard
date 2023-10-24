import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import "./style/Users_style.scss";


export default function AdminUsers() {

    const [users, setUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [currentUserId, setCurrentUserId] = useState(null);


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        status: ''
    })

    const handleEditUser = (user) => {
        setFormData({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            status: user.status
        })
        setCurrentUserId(user._id)
        setShowModal(true)
    }

    const handleUpdate = (userId) => {
        axios.put(`http://localhost:3002/api/person/${userId}`, formData)
            .then(response => {
                const updatedUser = users.map(user => user._id === userId ? response.data : user)
                setUsers(updatedUser)
                setShowModal(false)
            })
            .catch(error => {
                console.log("Error :", error)
            })
    }

    useEffect(() => {
        axios.get('http://localhost:3002/api/persons')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.log("Error: ", error);
            })
    }, []);

    const button_delete = (userId) => {

        axios.delete(`http://localhost:3002/api/person/${userId}`)
            .then(response => {
                setUsers(users.filter(user => user._id !== userId))
            })

            .catch(error => {
                console.log('Error:', error);
            });
    };

    return (
        <>
            <div>
                <Link to={'/admin/form-user'}>
                    <button className="create">Create User</button>
                </Link>
                <div className="section_padding persons">
                    <h1>List of Users</h1>
                    <div className="persons__container">
                        {users.map(user => {
                            return (
                                <div key={user._id} className="persons__card">
                                    <h3>{user.firstname} {user.lastname}</h3>
                                    <p className="email">Email : {user.email}</p>
                                    <p>Status : {user.status}</p>
                                    <button onClick={() => handleEditUser(user)} className='edit'>Modify</button>
                                    <button onClick={() => button_delete(user._id)} className="delete">Delete</button>
                                </div>
                            )
                        })}

                        {showModal && (
                            <div className='modal-overlay'>
                                <div className='modal'>
                                    <h2>Edit user infos</h2>
                                    <input type="text" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
                                    <input type="text" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                                    <input type="text" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                                    <input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} />

                                    <div className='buttons'>
                                        <button onClick={() => { setShowModal(false); setCurrentUserId(null) }} className='cancel'>Cancel</button>
                                        <button onClick={() => handleUpdate(currentUserId)} className='update'>Update</button>
                                    </div>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
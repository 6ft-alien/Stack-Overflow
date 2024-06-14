import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import moment from 'moment'

import pen from '../../assets/pen-solid.svg'
import info from '../../assets/info.svg'
import cake_candles from '../../assets/cake_candles.svg'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import './UsersProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id )[0]
    const currentUser = useSelector((state) => state.currentUserReducer)

    const [Switch, setSwitch] = useState(false)

    const handleLoginHistory = () => {
        navigate(`/Users/login-history/${id}`)
    }

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar borderRadius="10px" color="white" fontSize="50px" size="125px" >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><img src={cake_candles} alt="Cake" style={{height:"13px"}} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <div>
                                    <button type='button' onClick={() => setSwitch(true)} className="edit-profile-btn">
                                        <img src={pen} alt="" style={{height:"13px", marginRight:"5px"}}/> Edit Profile
                                    </button>
                                    <button type='button' onClick={() => handleLoginHistory()} className="edit-profile-btn">
                                        <img src={info} alt="" style={{height:"13px", marginRight:"5px"}}/> Login History
                                    </button>
                                </div>
                                
                            )
                        }
                    </div>
                    <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/>
                            ) : (
                                <ProfileBio currentProfile={currentProfile}/>
                            )
                        }
                    </>
                </section>
            </div>
        </div>
    )
}

export default UserProfile 

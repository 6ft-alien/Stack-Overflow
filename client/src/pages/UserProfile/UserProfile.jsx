import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux'
import moment from 'moment'

import pen from '../../assets/pen-solid.svg'
import cake_candles from '../../assets/cake_candles.svg'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import './UsersProfile.css'

const UserProfile = () => {

    const { id } = useParams()
    const users = useSelector((state) => state.usersReducer)
    const currentProfile = users.filter((user) => user._id === id ) [0]
    const currentUser = useSelector((state) => state.currentUserReducer)
    console.log(currentUser)

    const [Switch, setSwitch] = useState(false)

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <section>
                    <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" borderRadius="10px" color="white" fontSize="50px" px="40px" py="30px" >
                                {currentProfile?.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{currentProfile?.name}</h1>
                                <p><img src={cake_candles} alt="Cake" style={{height:"13px"}} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        {
                            currentUser?.result._id === id && (
                                <button type='button' onClick={() => setSwitch(true)} className="edit-profile-btn">
                                    <img src={pen} alt="" style={{height:"13px"}}/> Edit Profile
                                </button>
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
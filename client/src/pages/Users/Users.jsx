import React from "react";
import { useTranslation } from 'react-i18next';

import './Users.css'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import UsersList from "./UsersList";

const Users = () => {
    const { t } = useTranslation();

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2" style={{marginTop: "30px"}}>
                <h1 style={{fontWeight:"400"}}>{t('usersPage.title')}</h1>
                <UsersList />
            </div>
        </div>
    )
}

export default Users;

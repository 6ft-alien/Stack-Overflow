import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar';
import LoginHistoryList from "./LoginHistoryList";
import { fetchLoginHistory } from "../../actions/users";
import './LoginHistory.css'


const LoginHistory = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const users = useSelector((state) => state.usersReducer);
    const currentProfile = users.filter((user) => user._id === id )[0];
    const loginHistory = useSelector((state) => state.loginHistoryReducer);

    useEffect(() => {
        if (id) {
            dispatch(fetchLoginHistory(id));
        }
    }, [dispatch, id]);

    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2" style={{ marginTop: "30px" }}>
                <h1 style={{ fontWeight: "400" }}><b>{currentProfile?.name}</b> - Login History</h1>
                <LoginHistoryList loginHistory={loginHistory} />
            </div>
        </div>
    );
}

export default LoginHistory;

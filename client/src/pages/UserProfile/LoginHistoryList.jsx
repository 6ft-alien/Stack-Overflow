import React from "react";
import { useSelector } from 'react-redux';
import History from "./History";
import './LoginHistory.css';

const LoginHistoryList = () => {
    const loginHistory = useSelector((state) => state.loginHistoryReducer);

    return (
        <div className="history-list-container">
            {loginHistory && loginHistory.length > 0 ? (
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Browser</th>
                            <th>OS</th>
                            <th>Device Type</th>
                            <th>IP Address</th>
                            <th>Login Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginHistory.map((record) => (
                            <History record={record} key={record._id} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No login history available.</p>
            )}
        </div>
    );
};

export default LoginHistoryList;

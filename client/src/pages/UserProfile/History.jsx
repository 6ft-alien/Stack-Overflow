import React from "react";
import './LoginHistory.css';

const History = ({ record }) => {
    return (
        <tr>
            <td>{record.browser}</td>
            <td>{record.os}</td>
            <td>{record.deviceType}</td>
            <td>{record.ipAddress}</td>
            <td>{new Date(record.loginTime).toLocaleString()}</td>
        </tr>
    );
};

export default History;

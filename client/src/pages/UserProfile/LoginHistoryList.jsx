import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import History from './History';
import './LoginHistory.css';

const LoginHistoryList = () => {
    const { t } = useTranslation();
    const loginHistory = useSelector((state) => state.loginHistoryReducer);

    return (
        <div className="history-list-container">
            {loginHistory && loginHistory.length > 0 ? (
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>{t('loginHistory.browser')}</th>
                            <th>{t('loginHistory.os')}</th>
                            <th>{t('loginHistory.deviceType')}</th>
                            <th>{t('loginHistory.ipAddress')}</th>
                            <th>{t('loginHistory.loginTime')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginHistory.map((record) => (
                            <History record={record} key={record._id} />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>{t('loginHistory.noHistory')}</p>
            )}
        </div>
    );
};

export default LoginHistoryList;

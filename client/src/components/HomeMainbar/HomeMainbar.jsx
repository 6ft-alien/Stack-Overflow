import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import './HomeMainbar.css';
import QuestionList from './QuestionList';

const HomeMainbar = () => {
  const location = useLocation();
  const User = useSelector((state) => state.currentUserReducer);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const questionsList = useSelector((state) => state.questionsReducer);
  console.log(questionsList);

  const checkAuth = () => {
    if (User === null) {
      alert(t('home.loginToAskQuestion'));
      navigate('/Auth');
    } else {
      navigate('/AskQuestion');
    }
  };

  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
        {location.pathname === '/' ? <h1>{t('home.topQuestions')}</h1> : <h1>{t('home.allQuestions')}</h1>}
        <button onClick={checkAuth} className='ask-btn'>{t('home.askQuestion')}</button>
      </div>
      <div>
        {questionsList.data === null ? (
          <h1>{t('home.loading')}</h1>
        ) : (
          <>
            <p>{t('home.questionsCount', { count: questionsList.data.length })}</p>
            <QuestionList questionsList={questionsList.data} />
          </>
        )}
      </div>
    </div>
  );
};

export default HomeMainbar;

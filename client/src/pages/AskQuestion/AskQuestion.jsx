import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { askQuestion } from '../../actions/question';
import './AskQuestion.css';

const AskQuestion = () => {
    const { t } = useTranslation();
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionBody, setQuestionBody] = useState('');
    const [questionTags, setQuestionTags] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.currentUserReducer?.result);

    const handleSubmit = (e) => {
        e.preventDefault();
        let valid = true;

        if (!questionTitle && !questionBody) {
            valid = false;
            alert(t('askQues.alerts.enterTitleBody'));
        } else if (!questionTitle) {
            valid = false;
            alert(t('askQues.alerts.enterTitle'));
        } else if (!questionBody) {
            valid = false;
            alert(t('askQues.alerts.enterBody'));
        }

        if (valid && user) {
            dispatch(
                askQuestion(
                    { questionTitle, questionBody, questionTags, userPosted: user.name, userId: user._id },
                    navigate
                )
            );
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            setQuestionBody(questionBody + '\n');
        }
    };

    return (
        <div className='ask-question'>
            <div className='ask-ques-container'>
                <h1>{t('askQues.title')}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='ask-form-container'>
                        <label htmlFor='ask-ques-title'>
                            <h4>{t('askQues.labels.title')}</h4>
                            <p>{t('askQues.descriptions.title')}</p>
                            <input
                                type='text'
                                name='ask-ques-title'
                                id='ask-ques-title'
                                onChange={(e) => setQuestionTitle(e.target.value)}
                                placeholder={t('askQues.placeholders.title')}
                            />
                        </label>

                        <label htmlFor='ask-ques-body'>
                            <h4>{t('askQues.labels.body')}</h4>
                            <p>{t('askQues.descriptions.body')}</p>
                            <textarea
                                name='ask-ques-body'
                                id='ask-ques-body'
                                onChange={(e) => setQuestionBody(e.target.value)}
                                cols='30'
                                rows='10'
                                onKeyDown={handleEnter}
                                placeholder={t('askQues.placeholders.body')}
                            />
                        </label>

                        <label htmlFor='ask-ques-tags'>
                            <h4>{t('askQues.labels.tags')}</h4>
                            <p>{t('askQues.descriptions.tags')}</p>
                            <input
                                type='text'
                                name='ask-ques-Tags'
                                id='ask-ques-tags'
                                onChange={(e) => setQuestionTags(e.target.value.split(' '))}
                                placeholder={t('askQues.placeholders.tags')}
                            />
                        </label>
                    </div>
                    <input className='review-btn' type='submit' value={t('askQues.buttons.review')} />
                </form>
            </div>
        </div>
    );
};

export default AskQuestion;

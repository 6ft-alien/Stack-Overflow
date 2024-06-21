import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import copy from 'copy-to-clipboard';

import upvote from '../../assets/sort-up.svg';
import downvote from '../../assets/sort-down.svg';
import './Questions.css';
import Avatar from '../../components/Avatar/Avatar';
import DisplayAnswer from './DisplayAnswer';
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question';

const QuestionsDetails = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const questionsList = useSelector((state) => state.questionsReducer);
    const location = useLocation();
    const url = 'https://stack-overflow-6ft-alien.vercel.app';

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Answer, setAnswer] = useState('');
    const User = useSelector((state) => state.currentUserReducer);

    const handlePostAnswer = (e, answerLength) => {
        e.preventDefault();
        if (User === null) {
            alert(t('quesDetails.loginOrSignup'));
            navigate('/Auth');
        } else {
            if (Answer === '') {
                alert(t('quesDetails.enterAnswer'));
            } else {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: Answer, userAnswered: User.result.name, userId: User.result._id }));
            }
        }
    };

    const handleShare = () => {
        copy(url + location.pathname);
        alert(t('quesDetails.copiedURL') + url + location.pathname);
    };

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate));
    };

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id));
    };

    const handleDownVote = () => {
        dispatch(voteQuestion(id, 'downVote', User.result._id));
    };

    return (
        <div className="question-details-page">
            {questionsList.data === null ? (
                <h1>{t('quesDetails.loading')}</h1>
            ) : (
                <>
                    {questionsList.data.filter((question) => question._id === id).map((question) => (
                        <div key={question._id}>
                            <section className="question-details-container">
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upvote} alt="" width="18" className="votes-icon" onClick={handleUpVote} />
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downvote} alt="" width="18" className="votes-icon" onClick={handleDownVote} />
                                    </div>
                                    <div style={{ width: '100%' }}>
                                        <p className="question-body">{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {question.questionTags.map((ele) => (
                                                <p key={ele}>{ele}</p>
                                            ))}
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type="button" onClick={handleShare}>
                                                    {t('quesDetails.shareButton')}
                                                </button>
                                                {User?.result?._id === question?.userId && (
                                                    <button type="button" onClick={handleDelete}>
                                                        {t('quesDetails.deleteButton')}
                                                    </button>
                                                )}
                                            </div>
                                            <div>
                                                <p>
                                                    {t('quesDetails.asked')} {moment(question.askedOn).fromNow()}
                                                </p>
                                                <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: '#0086d8' }}>
                                                    <Avatar backgroundColor="orange" >
                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div>{question.userPosted}</div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {question.noOfAnswers !== 0 && (
                                <section>
                                    <h3>{question.noOfAnswers} {t('quesDetails.answers')}</h3>
                                    <DisplayAnswer key={question._id} question={question} handleShare={handleShare} />
                                </section>
                            )}
                            <section className="post-ans-container">
                                <h3>{t('quesDetails.yourAnswer')}</h3>
                                <form onSubmit={(e) => handlePostAnswer(e, question.answer.length)}>
                                    <textarea cols="30" rows="10" onChange={(e) => setAnswer(e.target.value)}></textarea> <br />
                                    <input type="submit" className="post-ans-btn" value={t('quesDetails.postYourAnswer')} />
                                </form>
                                <p>
                                    {t('quesDetails.browseOtherQuestions')}
                                    {question.questionTags.map((tag) => (
                                        <Link to="/Tags" key={tag} className="ans-tags">
                                            {tag}
                                        </Link>
                                    ))}{' '}
                                    {t('quesDetails.or')}{' '}
                                    <Link to="/AskQuestion" style={{ textDecoration: 'none', color: '#009dff' }}>
                                        {t('quesDetails.askYourQuestion')}
                                    </Link>
                                    .
                                </p>
                            </section>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default QuestionsDetails;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Avatar from '../../components/Avatar/Avatar';
import { deleteAnswer } from '../../actions/question';

const DisplayAnswer = ({ question, handleShare }) => {
    const { t } = useTranslation();
    const User = useSelector((state) => state.currentUserReducer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const handleDelete = (answerId, noOfAnswers) => {
        dispatch(deleteAnswer(id, answerId, noOfAnswers - 1));
    };

    return (
        <div>
            {question.answer.map((ans) => (
                <div className="display-ans" key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className="question-actions-user">
                        <div>
                            <button type="button" onClick={handleShare}>
                                {t('dispAns.shareButton')}
                            </button>
                            {User?.result?._id === ans?.userId && (
                                <button type="button" onClick={() => handleDelete(ans._id, question.noOfAnswers)}>
                                    {t('dispAns.deleteButton')}
                                </button>
                            )}
                        </div>
                        <div>
                            <p>
                                {t('dispAns.answeredOn')} {moment(ans.answeredOn).fromNow()}
                            </p>
                            <Link to={`/Users/${ans.userId}`} className="user-link" style={{ color: '#0086d8' }}>
                                <Avatar backgroundColor="lightgreen" px="8px" py="5px" borderRadius="4px">
                                    {ans.userAnswered.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>{ans.userAnswered}</div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DisplayAnswer;

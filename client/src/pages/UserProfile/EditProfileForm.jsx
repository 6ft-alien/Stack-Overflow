import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { updateProfile } from "../../actions/users";

const EditProfileForm = ({ currentUser, setSwitch }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(currentUser?.result?.name);
    const [about, setAbout] = useState(currentUser?.result?.about);
    const [tags, setTags] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (tags.length === 0) {
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags: currentUser?.result?.tags }));
            alert(t('editProfile.updateSuccess'));
        } else {
            dispatch(updateProfile(currentUser?.result?._id, { name, about, tags }));
            alert(t('editProfile.updateSuccess'));
        }
        setSwitch(false);
    };

    return (
        <div>
            <h1 className="edit-profile-title">
                {t('editProfile.title')}
            </h1>
            <h2 className="edit-profile-title-2">
                {t('editProfile.publicInfo')}
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>{t('editProfile.displayName')}</h3>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>{t('editProfile.aboutMe')}</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>{t('editProfile.tags')}</h3>
                    <p>{t('editProfile.tagsDescription')}</p>
                    <input type="text" id="tags" onChange={(e) => setTags(e.target.value.split(' '))} />
                </label><br />
                <input type="submit" value={t('editProfile.saveProfile')} className="user-submit-btn" />
                <button type="button" className="user-cancel-btn" onClick={() => setSwitch(false)}>
                    {t('editProfile.cancel')}
                </button>
            </form>
        </div>
    );
};

export default EditProfileForm;

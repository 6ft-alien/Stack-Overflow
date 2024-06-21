import React from "react";
import { useTranslation } from 'react-i18next';
import TagsList from "./TagsList";
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar';
import { useTagsList } from './tagList';
import './Tags.css';

const Tags = () => {
    const { t } = useTranslation();
    const tagsList = useTagsList();
    
    return (
        <div className="home-container-1">
            <LeftSideBar />
            <div className="home-container-2">
                <h1 className="tags-h1">{t('tagPage.tags')}</h1>
                <p className="tags-p">{t('tagPage.description1')}</p>
                <p className="tags-p">{t('tagPage.description2')}</p>
                <div className="tags-list-container">
                    {
                        tagsList.map((tag) => (
                            <TagsList tag={tag} key={tag.tagName}/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Tags;

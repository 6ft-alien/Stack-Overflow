import { useTranslation } from 'react-i18next';

export const useTagsList = () => {
  const { t } = useTranslation();
  
  return [
    {
      tagName: "javascript",
      tagDesc: t('tagList.javascript'),
    },
    {
      tagName: "python",
      tagDesc: t('tagList.python'),
    },
    {
      tagName: "c#",
      tagDesc: t('tagList.csharp'),
    },
    {
      tagName: "java",
      tagDesc: t('tagList.java'),
    },
    {
      tagName: "php",
      tagDesc: t('tagList.php'),
    },
    {
      tagName: "html",
      tagDesc: t('tagList.html'),
    },
    {
      tagName: "android",
      tagDesc: t('tagList.android'),
    },
    {
      tagName: "css",
      tagDesc: t('tagList.css'),
    },
    {
      tagName: "Reactjs",
      tagDesc: t('tagList.reactjs'),
    },
    {
      tagName: "node.js",
      tagDesc: t('tagList.nodejs'),
    },
  ];
};

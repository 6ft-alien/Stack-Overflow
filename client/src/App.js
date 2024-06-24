import './App.css';
import { useEffect } from 'react';
import { fetchAllQuestions } from './actions/question';
import { useDispatch } from 'react-redux';
import AllRoutes from './AllRoutes';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import { fetchAllUsers } from './actions/users';
import i18n from './hooks/i18n';
import LanguageBackground from './components/LanguageBackground/LanguageBackground';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <LanguageBackground>
          <Navbar />
          <AllRoutes />
        </LanguageBackground>
      </Router>
    </I18nextProvider>
  );
}

export default App;

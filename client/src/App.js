import './App.css';
import { useEffect } from 'react';
import { fetchAllQuestions } from './actions/question';
import { useDispatch } from 'react-redux';
import AllRoutes from './AllRoutes';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { fetchAllUsers } from './actions/users';
function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(fetchAllUsers())
  }, [dispatch])

  return (
    <div className='App'>
      <I18nextProvider i18n={i18n}>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
      </I18nextProvider>
    </div>
  );
}

export default App;

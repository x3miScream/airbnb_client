import './App.css';
import {Route, Routes} from 'react-router-dom'
import IndexPage from './Pages/IndexPage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx'
import Layout from './Layout';
import {UserContextProvider} from './UserContext.jsx'
import AccountPage from './Pages/AccountPage.jsx';


function App() {
  return (

    <UserContextProvider>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action?' element={<AccountPage />} />
          
        </Route>
      </Routes>

    </UserContextProvider>
    
  );
}

export default App;

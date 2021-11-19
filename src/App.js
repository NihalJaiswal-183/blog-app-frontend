import { createContext, useEffect, useState } from "react";
import { Box } from '@material-ui/core';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
//components
import Home from './components/home/Home';
import DetailView from './components/details/DetailView';
import CreatePost from './components/create/CreatePost';
import Update from './components/create/Update';
import Signup from './components/Signup';
import Login from './components/Login';
import UserProfile from './components/UserProfile/UserProfile';
import Profile from './components/UserProfile/Profile';
import { auth } from './firebase';
import './App.css';

import About from './components/about/About';
import Contact from './components/contact/Contact';
export const LoginContext = createContext(null);
function App() {
  const [account, setAccount] = useState('');

  useEffect(() => {
   
    auth.onAuthStateChanged(user => {
      if (user){
          setAccount(user);   
      }
      else{
        setAccount(null);
      }
    })
  }, [])
  return (
    <div className="App">
      <LoginContext.Provider value={{ account }}>
        <BrowserRouter>

          <Box style={{ marginTop: 64 }}>
            <Switch>
              {

                account ?
                  <>
                    <Route exact path='/Signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/' component={Home} />
                    <Route exact path='/create' component={CreatePost} />
                    <Route exact path='/details/:id' component={DetailView} />
                    <Route exact path='/update/:id' component={Update} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/contact' component={Contact} />
                    <Route  exact path='/UserProfile' component={Profile} />
                    <Route  path='/Profile/:id' component={UserProfile} />
                  </> : <>
                    <Route exact path='/Signup' component={Signup} />
                    <Route exact path='/login' component={Login} />
                  </>
              }

            </Switch>
          </Box>
        </BrowserRouter>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
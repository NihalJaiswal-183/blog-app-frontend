
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core'; 
import { Link ,useHistory  } from 'react-router-dom';
import { auth } from '../../firebase';
import '../../App.css';
import React, { useState, useEffect } from 'react';

const useStyle = makeStyles({
    component: {
        background:'#FFFFFF',
        color: 'black'
    },
   
    container: {
        justifyContent: 'center',
        '&  >*': {
            padding: 20,
            color: 'black',
            textDecoration: 'none'
        }
    }
})

const Header = (props) => {
    const [dark, setDark] = useState(false);
    const classes = useStyle();
    const history = useHistory();


    const signout =  () => {
        auth.signOut().then(function() {
            history.push(`/login`);
          }).catch(function(error) {
            console.log(error);
          });
     
    }
   
    return (
        <AppBar className={classes.component }>
            <Toolbar className={classes.container}>
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/UserProfile'>PROFILE</Link>
                <Button onClick={() => signout()} variant="contained" color="white">Logout</Button>
                <div className="nav">
  
</div>
            </Toolbar>
        </AppBar>
    )
}

export default Header;
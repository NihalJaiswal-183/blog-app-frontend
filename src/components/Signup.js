import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React, { useState } from 'react';
import 'firebase/compat/auth';
import { auth } from '../firebase'
import { useHistory } from 'react-router-dom';
import { createUser } from '../service/api';
const user = {
  name: '',
  pic: '',
  email: '',
  followers: [],
  following: [],
}
const Signup = () => {

  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const btnstyle = { margin: '8px 0' }
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSumbit = async (e) => {

    e.preventDefault();

    console.log(auth);
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      user.name = name;
      user.email = email;
      await createUser(user);
      history.push('/');
    }
    catch (error) {
      alert(error);
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <form onSubmit={(e) => handleSumbit(e)}>
          <TextField label='name' placeholder='Enter username' fullWidth required name="name"
            id="name"

            onChange={(e) => setName(e.target.value)} />
          <TextField label='Username' placeholder='Enter email' fullWidth required name="email"
            onChange={(e) => {

              setEmail(e.target.value)
            }} />

          <TextField label='Password' placeholder='Enter password' fullWidth required type="password"
            id="password"

            onChange={(e) => setPassword(e.target.value)} />
          <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign Up</Button>
        </form>
        <Typography > Do you have an account ?
          <Link href="/login" >
            Sign In
          </Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Signup
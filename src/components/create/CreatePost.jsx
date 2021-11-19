import React, { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase } from '@material-ui/core';
import { AddCircle as Add, CallEnd } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { createPost, uploadFile } from '../../service/api';
import { LoginContext } from '../../App';
import Header from '../header/Header';       

const useStyle = makeStyles(theme => ({
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    }
}));
const initialPost = {
    title: '',
    description: '',
    picture: '',
    username:'',
    categories: '',
    createdDate: new Date()
}


const CreatePost = () => {
    const { account } = useContext(LoginContext);
    
    const classes = useStyle();
    const history = useHistory();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const [url, setImageURL] = useState('https://source.unsplash.com/random');
    
    

    
    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                const data = new FormData();
                data.append("upload_preset", "blogappnihal");
                data.append("file", file);
                
                const image = await uploadFile(data);
                
                setPost({ ...post, picture: image.data.secure_url});
                console.log(post.picture);
                setImageURL(image.data.secure_url);
            }
        }
        getImage();
        setPost({ ...post, username: account.email});
    }, [file])

    const savePost = async () => {
        console.log(post);
        await createPost(post);
        history.push('/');
    }

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    return (
        <Box className={classes.container}>
        <Header/>
            <img src={url} alt="post" className={classes.image} />

            <FormControl className={classes.title}>
                <label htmlFor="fileInput">
                    <Add className={classes.addIcon} fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                
                <InputBase onChange={(e) => handleChange(e)} name='title' placeholder="Title" className={classes.textfield} />
                <Button onClick={() => savePost()} variant="contained" color="primary">Publish</Button>
            </FormControl>
            <input onChange={(e) => handleChange(e)} name='categories' placeholder="category" className={classes.textfield} />
            <TextareaAutosize
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
                onChange={(e) => handleChange(e)} 
            />
        </Box>
    )
}

export default CreatePost;
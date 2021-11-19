import { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, Typography, Grid } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom'
import { getPost, deletePost, getUser } from '../../service/api';
import Header from '../header/Header';
import { LoginContext } from '../../App';

//components
import Comments from './comments/Comments';

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
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    author: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));
const DetailView = ({ match }) => {
    const classes = useStyle();
    const url = 'https://source.unsplash.com/random';
    const history = useHistory();

    const [post, setPost] = useState({});
    const [user, setUser] = useState({});
    const { account } = useContext(LoginContext);

    useEffect(() => {
        const fetchData = async () => {
            let data = await getPost(match.params.id);
            setPost(data);
            data = await getUser(data.username);
            setUser(data[0]);
        }
        fetchData();
    }, []);

    const deleteBlog = async () => {
        await deletePost(post._id);
        history.push('/')
    }

    return (
        <Box className={classes.container}>
            <Header />
            <img src={post.picture || url} alt="post" className={classes.image} />
            <Box className={classes.icons}>
                {
                    account.email === post.username &&
                    <>
                        <Link to={`/update/${post._id}`}><Edit className={classes.icon} color="primary" /></Link>
                        <Delete onClick={() => deleteBlog()} className={classes.icon} color="error" />
                    </>
                }
            </Box>
            <Typography className={classes.heading}>{post.title}</Typography>

            <Box className={classes.author}>
                <Link to={`/profile/${user._id}`} className={classes.link}>
                    <Typography>Author: <span style={{ fontWeight: 600 }}>{user.name}</span></Typography>
                </Link>
                <Typography style={{ marginLeft: 'auto' }}>{new Date(post.createdDate).toDateString()}</Typography>
                <Typography style={{ marginLeft: 'auto' }}>{post.categories}</Typography>
            </Box>

            <Typography className={classes.detail}>{post.description}</Typography>
            <Comments post={post} />
        </Box>
    )
}

export default DetailView;
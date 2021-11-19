import React, { useEffect, useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { LoginContext } from '../../App';
import { getAllPostsUser, getUser, updateUser } from '../../service/api';
import { uploadFile } from '../../service/api';
import { Grid, Box } from '@material-ui/core';
import Post from '../home/post/Post';
import Header from '../header/Header';
import { AddCircle as Add, CallEnd } from '@material-ui/icons';

const Profile = ({ match }) => {
    const { account } = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState('');
    const [file, setFile] = useState('');
    const [imageURL, setImageURL] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            let data = await getUser(account.email);
            setUser(data[0]);
            let postdata = await getAllPostsUser(data[0]._id); // params in url
            setPosts(postdata);
        }
        fetchData();
    }, [])
    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append("upload_preset", "blogappnihal");
                data.append("file", file);
                console.log(user);
                const image = await uploadFile(data);
                user.pic = image.data.secure_url;
                console.log(user._id);
                setImageURL(image.data.secure_url);
                await updateUser(user._id, user);

            }
        }
        getImage();
    }, [file])

    return (
        <>

            <Header />
            <div style={{ maxWidth: "550px", margin: "4px auto" }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-around",
                    margin: "18px 0px 0px 0px",
                    borderBottom: "1px solid grey"
                }}>
                    <div>
                        <img style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                            src={user.pic ? user.pic : "https://tse4.mm.bing.net/th?id=OIP.OcdKodm_a3FiAYKlUAjFdgHaE8&pid=Api&P=0&w=246&h=165"
                            } />
                        <label htmlFor="fileInput">
                            <Add fontSize="large" color="action" />
                        </label>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </div>

                    <div>
                        <h1>{user.name}</h1>
                        <h5>{user.email}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "108%" }}>
                            <h3> posts {posts === undefined ? 0 : posts.length}</h3>

                            <h3> following {user.following === undefined ? 0 : user.following.length}</h3>
                            <h3> followers {user.followers === undefined ? 0 : user.followers.length}</h3>
                        </div>




                    </div>


                </div>


            </div>
            {
                posts.length ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected category
                </Box>
            }
        </>
    )
}


export default Profile
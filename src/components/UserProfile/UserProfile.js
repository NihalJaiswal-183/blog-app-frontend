import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../App';
import { getAllPostsUser, getUserbyID, getUser, updatefollow, updateUnfollow } from '../../service/api';
import { Grid, Box } from '@material-ui/core';
import Post from '../home/post/Post';
import Header from '../header/Header';

const UserProfile = ({ match }) => {
    const { account } = useContext(LoginContext);
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState([]);
    const [follow, setFollow] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            let data = await getAllPostsUser(match.params.id); // params in url
            setPosts(data);
            data = await getUserbyID(match.params.id);
            setUser(data);
            console.log(data);
            data = await getUser(account.email);
            setFollow(data[0].following.includes(match.params.id));
        }
        fetchData();
    }, [])

    const followUser = async () => {
        try {
            let followers;
            followers = user._id;
            let following = await getUser(account.email);

            following = following[0]._id;
            await updatefollow({ following, followers });

        }
        catch (e) {
            alert(e);
        }
    }
    const UnfollowUser = async () => {
        try {
            let followers;
            followers = user._id;
            let following = await getUser(account.email);
            following = following[0]._id;

            await updateUnfollow({ following, followers });
        }
        catch (e) {
            alert(e);
        }
    }

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
                            src={user.pic}
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

                {


                    !follow ?

                        <button style={{
                            margin: "10px"
                        }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={() => followUser()}
                        >
                            Follow
                        </button>
                        :
                        <button
                            style={{
                                margin: "10px"
                            }}
                            className="btn waves-effect waves-light #64b5f6 blue darken-1"
                            onClick={() => UnfollowUser()}
                        >
                            UnFollow
                        </button>


                }
            </div>

            {
                posts.length ? posts.map(post => (
                    <Grid item lg={3} sm={4}>
                        <Link style={{ textDecoration: 'none', color: 'inherit' }} to={`/details/${post._id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                    No data is available for selected User
                </Box>
            }

        </>
    )
}


export default UserProfile
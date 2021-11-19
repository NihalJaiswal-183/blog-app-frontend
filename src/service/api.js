import axios from 'axios';

const url = 'https://blog-app-back-end.herokuapp.com';
// const url = 'http://localhost:8000';

export const uploadFile = async (post) => {
    console.log(post);
    try {
        return await axios.post(`https://api.cloudinary.com/v1_1/de9j6ufii/image/upload `, post);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const updatefollow = async (param) => {
   
    try {
        console.log(param.following);
        return await axios.put(`${url}/updatefollow`,param);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const updateUnfollow = async (param) => {
   
    try {
       ;
        return await axios.put(`${url}/updateUnfollow`,param);
    } catch (error) {
        console.log('Error while calling uploadFile API ', error);
    }
}
export const createUser = async (user) => {
    try {
        return await axios.post(`${url}/createUser`, user);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}
export const getUser = async (param) => {
    try {
        let response = await axios.get(`${url}/user/?username=${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}
export const updateUser = async (id,param) => {
    try {
        
        let response = await axios.put(`${url}/updateUser/${id}`,param);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}
export const getUserbyID = async (param) => {
    try {
        let response = await axios.get(`${url}/user/${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}
export const createPost = async (post) => {
    try {
        return await axios.post(`${url}/create`, post);
    } catch (error) {
        console.log('Error while calling createPost API ', error);
    }
}

export const getAllPosts = async (param) => {
    try {
        console.log(param);
        let response = await axios.get(`${url}/posts${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPosts API ', error)
    }
}

export const getPost = async (id) => {
    try {
        let response = await axios.get(`${url}/post/${id}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPost API ', error);
    }
}
export const getAllPostsUser = async (param) => {
    try {
        let response = await axios.get(`${url}/postUser/${param}`);
        return response.data;
    } catch (error) {
        console.log('Error while calling getPosts API ', error)
    }
}
export const updatePost = async (id, post) => {
    try {
        return await axios.put(`${url}/update/${id}`, post);
        
    } catch(error) {
        console.log('Error while calling updatePost API ', error)
    }
}

export const deletePost = async (id) => {
    try {
        return await axios.delete(`${url}/delete/${id}`);
    } catch(error) {
        console.log('Error while calling deletePost API ', error)
    }
}


export const newComment = async (comment) => {
    try {
        return await axios.post(`${url}/comment/new/`, comment);
    } catch(error) {
        console.log('Error while calling newComment API ', error)
    } 
}

export const getComments = async (id) => {
    try {
        let response = await axios.get(`${url}/comments/${id}`);
        return response.data;
    } catch(error) {
        console.log('Error while calling getComments API ', error)
    } 
}

export const deleteComment = async (id) => {
    try {
        return await axios.delete(`${url}/comment/delete/${id}`);
    } catch(error) {
        console.log('Error while calling deleteComments API ', error)
    } 
}
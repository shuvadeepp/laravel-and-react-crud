import axios from 'axios';

export default function Api() {
    const http = axios.create({
        baseURL: 'http://localhost:8000/api', 
        headers: { 'Content-Type': 'application/json' }
    });

    // View All Posts
    const getAllpostData = async () => {
        return await http.get('/viewpost');
    };

    // Get a single post by ID
    const getPostById = async (id) => {
        return await http.get(`/getpost/${id}`);
    };

    // Update post by ID
    const updatePost = async (id, data) => {
        return await http.put(`/updatepost/${id}`, data);
    };

    // Delete post by ID
    const deletePost = async (id, data) => {
        return await http.put(`/deletepost/${id}`, data);
    };

    // Add a new post
    const createPost = async (data) => {
        return await http.post('/createpost', data);
    };

    console.log(getAllpostData);
    return { http, getAllpostData, getPostById, updatePost, createPost, deletePost };
}

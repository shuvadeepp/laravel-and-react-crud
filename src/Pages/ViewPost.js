import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import CreatePost from './CreatePost';
import { useNavigate } from 'react-router-dom';
import Api from '../Components/Api';

export default function ViewPost() {

    const navigate                          = useNavigate();
    const [listData, setListData]           = useState([]);
    const [loading, setLoading]             = useState(false); // Add loading state
    const [currentPage, setCurrentPage]     = useState(1); // Track current page
    const [totalPages, setTotalPages]       = useState(1); // Track total pages
    const [dataToEdit, setDataToEdit]       = useState(null);
    const { deletePost }                    = Api();

    const formatDate = (dateString) => {
        const date          = new Date(dateString);
        const day           = String(date.getDate()).padStart(2, '0');
        const month         = String(date.getMonth() + 1).padStart(2, '0');
        const year          = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const fetchPosts = async (page = 1) => {
        setLoading(true); // Set loading to true
        try {
            const response = await axios.get(`http://localhost:8000/api/viewpost?page=${page}`);
            if (response.status === 200) {
                setListData(response.data.db_bind_data);
                setCurrentPage(response.data.current_page);
                setTotalPages(response.data.last_page); // Update total pages
            }
        } catch (error) {
            console.error("Error fetching items:", error);
        } finally {
            setLoading(false); // Set loading to false after the request is done
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on component mount
    }, []);

    const handlePageChange = (page) => {
        fetchPosts(page); // Fetch posts for the selected page
    };

    const handleDelete = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(postId)
            .then(res => {
                    // console.log(res);
                    if (res.data.status === 200) {
                        alert("Post deleted successfully"); 
                         // Check if it's the last item on the current page, then adjust pagination if needed
                        if (listData.length === 1 && currentPage > 1) {
                            fetchPosts(currentPage - 1); // Go to the previous page if current page has no data left
                        } else {
                            fetchPosts(currentPage); // Refresh the list for the current page
                        }
                    } else {
                        alert("Error deleting post");
                    }
                })
                .catch(error => console.error("Error deleting post:", error));
        }
    };

    const onEdit = (postId) => {
        navigate(`/createpost/${postId}`);
    }; 

    return (
        <>
       
            <div className='container mt-5'>
                <h3 className='text-center'> View Post </h3>
                {loading ? ( // Show loader while loading
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="text-center">
                                <table class="table table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Sl</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Create on</th>
                                        <th>Publish Status</th>
                                        <th>Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                        </tr>
                                        <tr>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                            <td><span className="placeholder col-12 bg-primary"></span></td>
                                            <td><span className="placeholder col-12 bg-secondary"></span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <table className="table table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th>Sl</th>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Create on</th>
                                        <th>Publish Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listData.length > 0 ? (
                                        listData.map((post, index) => (
                                            <tr key={post.post_id}>
                                                <td> {(currentPage - 1) * 3 + index + 1} </td> 
                                                <td> {post.vch_title} </td>
                                                <td> {post.vch_desc} </td>
                                                <td> {formatDate(post.created_at)} </td>
                                                <td>
                                                    <span className={`badge ${post.int_publishStatus == 1 ? 'text-bg-info' : 'text-bg-secondary'}`}>
                                                        {post.int_publishStatus ? 'Publish' : 'Unpublish'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button type="button" className="btn btn-outline-primary mx-2" onClick={() => onEdit(post.post_id)}>Edit</button>
                                                    <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(post.post_id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center fw-bold">No posts available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                            {/* Pagination controls */}
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button 
                                    key={i + 1} 
                                    className={`btn btn-outline-dark mx-1 ${currentPage === i + 1 ? 'active' : ''}`} 
                                    onClick={() => handlePageChange(i + 1)}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

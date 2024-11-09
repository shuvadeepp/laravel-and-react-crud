import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Api from '../Components/Api';

export default function CreatePost() {
    
    const log = console.log;
    const { http, getPostById, updatePost, createPost } = Api();
    const { postId }    = useParams();  
    const navigate      = useNavigate();   

    const [txtTitle, setTxtTitle]       = useState('');
    const [errTitle, setErrTitle]       = useState('');
    const [txtDesc, setTxtDesc]         = useState('');
    const [errDesc, setErrDesc]         = useState('');
    const [loader, setLoader]           = useState('off');

    // Load data into the form if in "Edit" mode
    useEffect(() => {
        if (postId) {
            setLoader('on');
            getPostById(postId)
                .then(res => {
                    // console.log("Fetched data:", res.data.getPostData.);
                    setTxtTitle(res.data.getPostData.vch_title);
                    setTxtDesc(res.data.getPostData.vch_desc);
                    setLoader('off');
                })
                .catch(error => console.error("Error fetching post:", error));
        }
    }, [postId]);

    const submitFrm = () => {
        setLoader('on');

        const data = { txtTitle, txtDesc };

        if (postId) {
            // Edit mode: Update existing post
            updatePost(postId, data)
                .then(res => {
                    if (res.data.status === 422) {
                        setErrTitle(res.data.error.txtTitle);
                        setErrDesc(res.data.error.txtDesc);
                    } else {
                        navigate('/view-post');  
                    }
                    setLoader('off');
                })
                .catch(() => setLoader('off'));
        } else {
            // Add mode: Create new post
            createPost(data)
                .then(res => {
                    if (res.data.status === 422) {
                        setErrTitle(res.data.error.txtTitle);
                        setErrDesc(res.data.error.txtDesc);
                    } else {
                        navigate('/view-post');  
                    }
                    setLoader('off');
                })
                .catch(() => setLoader('off'));
        }
    };

    return (
        <>
            <div className='container mt-5'>
                <h3 className='text-center'>{postId ? "Edit Post" : "Create Post"}</h3>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="mb-3">
                                <label htmlFor="txtTitle" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="txtTitle"
                                    id="txtTitle"
                                    placeholder="Title"
                                    value={txtTitle}
                                    onChange={e => setTxtTitle(e.target.value)}
                                />
                                <span className='text-danger'>{errTitle}</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDesc" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="txtDesc"
                                    id="txtDesc"
                                    rows="3"
                                    value={txtDesc}
                                    onChange={e => setTxtDesc(e.target.value)}
                                ></textarea>
                                <span className='text-danger'>{errDesc}</span>
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={submitFrm}
                                disabled={loader === 'on'}
                            >
                                {loader === 'off' && <span>{postId ? "Update" : "Publish Now"}</span>}
                                {loader === 'on' && (
                                    <center>
                                        <span className="ms-1"> Please Wait </span> 
                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                    </center>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

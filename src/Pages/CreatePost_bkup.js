import { useState } from 'react';
import  Api from '../Components/Api';

export default function CreatePost(){

    const { http } = Api();
    const [ txtTitle, setTxtTitle ] = useState();
    const [ errTitle, setErrTitle ] = useState();
    const [ txtDesc, setTxtDesc ]   = useState();
    const [ errDesc, setErrDesc ]   = useState();
    const [ loader, setLoader ]     = useState('off');
    

    const submitFrm = () => {
        // console.log(title)

        setLoader('on');

        http.post('/createpost', { txtTitle: txtTitle, txtDesc: txtDesc }).then(res => {
            // console.log(res);
            if(res.data.status == 422){
                setErrTitle(res.data.error.txtTitle);
                setErrDesc(res.data.error.txtDesc);
            }
            setLoader('off');
        });
    }

    return(
        <>
            <div className='container mt-5'>
                <h3 className='text-center'> Create Post </h3>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8"> 
                        <div className="mb-3">
                                <label htmlFor="txtTitle" className="form-label">Title</label>
                                <input type="text" className="form-control" name="txtTitle" id="txtTitle" placeholder="Title" onChange={ e=>setTxtTitle(e.target.value) }/>
                                <span className='text-danger'>{ errTitle }</span>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="txtDesc" className="form-label">Description</label>
                                <textarea className="form-control" name="txtDesc" id="txtDesc" rows="3" onChange={ e=>setTxtDesc(e.target.value) }></textarea>
                                <span className='text-danger'>{ errDesc }</span>
                            </div>
                            <button 
                                type="button" 
                                className="btn btn-outline-primary" 
                                onClick={ submitFrm }
                                disabled={loader == 'on'}
                            >  
                                { loader=='off' && <span> Publish Now </span> }
                                { 
                                    loader=='on' && 
                                    <center> Processing <div class="spinner-border spinner-border-sm" role="status"> 
                                    </div>  
                                    </center> 
                                }  
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
        </>
    );
}
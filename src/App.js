import { Routes, Route, Link } from 'react-router-dom'; 
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import ViewPost from './Pages/ViewPost';
import Footer from './Pages/Footer';

function App() {
  return (
    <>
      
      {/* <nav className="navbar navbar-expand-lg bg-body-tertiary"> */}
      <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">CRUD APP</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Home
            </Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/create-post">
              Create Post
            </Link> 
            </li> 
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/view-post">
              View Post
            </Link> 
            </li> 
          </ul>
          <form className="d-flex" role="search">
            {/* <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            /> */}
            {/* <button className="btn btn-outline-success" type="submit">
              Search
            </button> */}
          </form>
        </div>
      </div>
    </nav>
      
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/create-post' element={<CreatePost/>}></Route>   
      <Route path='/view-post' element={<ViewPost/>}></Route>
      <Route path="/createpost/:postId" element={<CreatePost />} />
    </Routes>

    {/* <Footer/>  */}
    </>
  );
}

export default App;

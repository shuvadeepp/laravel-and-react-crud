import React from 'react';

const styles = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%'
};

export default function Footer() {
    return (
        <footer style={styles} className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-primary">
            <p className="col-md-4 mb-0 text-white">© 2024 Company, Inc</p>

            <a
                href="/"
                className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
                {/* Optional logo or branding can go here */}
                {/* <svg className="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg> */}
            </a>

            <nav className="col-md-4">
                <ul className="nav justify-content-end">
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">Create Post</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">View</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">LinkedIn</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">Download CV</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link px-2 text-white">About Me</a>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

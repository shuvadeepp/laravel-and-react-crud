import axios from 'axios';

export default function Api() {

    

    const http = axios.create({
        baseURL: 'http://localhost:8000/api', 
        headers: { 'Content-Type': 'application/json' }
    });

    // View All
    const getAllpostData = async () => {
        return await axios.get('http://localhost:8000/api/viewpost');
    };

    return { http, getAllpostData };
}


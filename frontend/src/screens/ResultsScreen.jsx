import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';

export default function ResultsScreen() {
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const location = useLocation();

    useEffect(() => {
        const username = location.state;
        console.log(username);
        setUsername(username);
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!username) {
        return (
            <div>
                <h1>Invalid username</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Results for {username}</h1>
        </div>
    )
}


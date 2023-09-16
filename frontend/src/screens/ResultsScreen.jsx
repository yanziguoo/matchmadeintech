import React, {useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import '../styles/ResultsScreen.css';
import UserCard from "../components/UserCard";
import tanay from "../assets/tanay.jpeg";

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
<<<<<<< HEAD
<<<<<<< HEAD
            <a href="/" className="logo-link">
                <img src={bannerLogo} alt="Your Logo" className="small-logo" />
            </a>
=======
>>>>>>> parent of fb9f7d9 (logo)
=======
>>>>>>> parent of fb9f7d9 (logo)
            <div class="title">Results for {username}</div>
            <UserCard pfp={tanay} name={username} join="march" lang="ffhdskjg" commit="300" />
        </div>
    );
}


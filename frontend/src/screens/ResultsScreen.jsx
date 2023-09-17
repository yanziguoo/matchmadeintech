import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ResultsScreen.css';
import UserCard from '../components/UserCard';
import tanay from '../assets/tanay.jpeg';
import bannerLogo from '../assets/banner logo.png';
import axios from 'axios';

export default function ResultsScreen() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [matches, setMatches] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const username = location.state;
    console.log(username);
    setUsername(username);
    axios.get(`http://localhost:5000/find_matches/${username}`)
      .then(res => {
        console.log(res.data);
        setMatches(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => console.log(err));
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
        <a href="/" className="logo-link">
            <img src={bannerLogo} alt="Your Logo" className="small-logo" />
        </a>
        <h1>Invalid username</h1>
        
      </div>
    )
  }

  return (
    <div>
      <a href="/" className="logo-link">
        <img src={bannerLogo} alt="Your Logo" className="small-logo" />
      </a>
      <div className="cards-container">
        <UserCard pfp={tanay} name={username} join="march" lang="ffhdskjg" commit="300" />
        <UserCard pfp={tanay} name="Placeholder" join="april" lang="random" commit="400" />
      </div>
    </div>
  );
}  
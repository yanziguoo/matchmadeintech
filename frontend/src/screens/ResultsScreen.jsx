import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ResultsScreen.css';
import UserCard from '../components/UserCard';
import tanay from '../assets/tanay.jpeg';
import bannerLogo from '../assets/banner logo.png';
import axios from 'axios';

export default function ResultsScreen() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState('');
  const [matches, setMatches] = useState([]);
  const [currMatch, setCurrMatch] = useState({});
  const [errorMess, setErrorMess] = useState('');
  const [curInd, setCurInd] = useState(0);

  const location = useLocation();

  const handleArrowClick = (dir) => {
    setLoading(true);
    if (dir === 'up') setCurInd((curInd - 1 + matches.length) % matches.length);
    else if (dir === 'down') setCurInd((curInd + 1) % matches.length);
    setLoading(false);
  }

  useEffect(() => {
    setCurrMatch(matches[curInd]);
  }, [curInd]);

  
  useEffect(() => {
    const username = location.state;

    axios.get(`http://localhost:5000/find_matches/${username}`)
      .then(res => {
        if (res.data && res.data.success) {
          setMatches(res.data.matches);
          setUser(res.data.user);
          setCurrMatch(res.data.matches[0]);
        } else {
          setErrorMess(res.data.message);
        }
        console.log(res.data)
        setLoading(false);
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

  if (!user) {
    return (
      <div>
        <a href="/" className="logo-link">
            <img src={bannerLogo} alt="Your Logo" className="small-logo" />
        </a>
        <h1>{errorMess}</h1>
        
      </div>
    )
  }

  return (
    <div>
      <a href="/" className="logo-link">
        <img src={bannerLogo} alt="Your Logo" className="small-logo" />
      </a>

      <div className="cards-container">
        <UserCard pfp={tanay} name={user["username"]} lang={user["languages"]} commit={user["contributions"]} showArrows={true} handleArrowClick={handleArrowClick}/>
        <UserCard pfp={tanay} name={currMatch['username']} lang={currMatch['languages']} commit={currMatch['contributions']} showArrows={true} handleArrowClick={handleArrowClick}/>
      </div>

    </div>
  );
}


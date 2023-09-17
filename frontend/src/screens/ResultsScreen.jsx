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
  let curInd = 0;

  useEffect(() => {
    const username = location.state;
    console.log(username);
    setUsername(username);

    /*axios.get(`http://localhost:5000/find_matches/${username}`)
      .then(res => {
        console.log(res.data);
        setMatches(res.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch(err => console.log(err));*/
    
    setMatches([
      {
          "contributions": 318,
          "id": 2,
          "languages": {
              "CSS": 0.6478968583318884,
              "JavaScript": 0.1027319121133681,
              "Other": 0.2492841329560398,
              "Shell": 0.00008709659870362743
          },
          "username": "robconery"
      },
      {
          "contributions": 171,
          "id": 2,
          "languages": {
              "CSS": 0.03810402136943,
              "Go": 0.0892590270381695,
              "HTML": 0.0229455113890129,
              "JavaScript": 0.8384999742330024,
              "Other": 0.0008631944205861,
              "Shell": 0.010328271549799
          },
          "username": "kaztraz"
      },
      {
          "contributions": 29,
          "id": 1,
          "languages": {
              "C": 0.053507102147453,
              "C++": 0.0411031186901537,
              "CSS": 0.0038898102486074,
              "HTML": 0.3271737541198061,
              "JavaScript": 0.5290436367605877,
              "Other": 0.0130023489444254,
              "PHP": 0.0015914946596763,
              "Python": 0.0304253232402683,
              "Shell": 0.0002634111890217
          },
          "username": "teaguesterling"
      },
      {
          "contributions": 1646,
          "id": 1,
          "languages": {
              "CSS": 0.2435401603049156,
              "JavaScript": 0.4723296526726828,
              "Other": 0.0183970754006065,
              "PHP": 0.0126269703367399,
              "Ruby": 0.2462586177904826,
              "Shell": 0.0068475234945724
          },
          "username": "beautifulcode"
      },
      {
          "contributions": 5,
          "id": 2,
          "languages": {
              "C++": 0.0006468664094427,
              "CSS": 0.0009103441525071,
              "HTML": 0.0005057467513928,
              "JavaScript": 0.8142881614474146,
              "Other": 0.0301808452496512,
              "Python": 0.0061415601471559,
              "Sass": 0.0005012602882756,
              "Shell": 0.0008051161993947,
              "Vue": 0.146020099354765
          },
          "username": "maykon"
      },
      {
          "contributions": 987,
          "id": 2,
          "languages": {
              "C": 0.1653735638768337,
              "CSS": 0.0944415674880504,
              "HTML": 0.0096833769459554,
              "JavaScript": 0.4132414336713884,
              "Other": 0.2762305862727935,
              "Ruby": 0.00574220128409,
              "Shell": 0.0352872704608884
          },
          "username": "truedat101"
      },
      {
          "contributions": 4,
          "id": 2,
          "languages": {
              "JavaScript": 1
          },
          "username": "drdator"
      },
      {
          "contributions": 272,
          "id": 1,
          "languages": {
              "CSS": 0.0445805775826536,
              "HTML": 0.0019497290572402,
              "JavaScript": 0.7648526926000295,
              "Python": 0.1834499918698264,
              "Rust": 0.0043532352418443,
              "Shell": 0.0008137736484059
          },
          "username": "qingfeng"
      },
      {
          "contributions": 926,
          "id": 2,
          "languages": {
              "CSS": 0.3182055486518085,
              "HTML": 0.1021598165505751,
              "JavaScript": 0.0271276992454665,
              "Other": 0.0831940620538898,
              "PHP": 0.375028230664752,
              "Python": 0.0870124235933775,
              "Shell": 0.0072722192401302
          },
          "username": "tedivm"
      },
      {
          "contributions": 145,
          "id": 1,
          "languages": {
              "CSS": 0.0132105589386625,
              "HTML": 0.0290974602233187,
              "JavaScript": 0.956503716927546,
              "Other": 0.0001927449837276,
              "PHP": 0.0009251957312433,
              "Shell": 0.00007032319550185109
          },
          "username": "justinbmeyer"
      },
      {
          "contributions": 114,
          "id": 2,
          "languages": {
              "CSS": 0.3349902572871515,
              "HTML": 0.36847337654591,
              "JavaScript": 0.2965363661669384
          },
          "username": "CoadyTech"
      },
      {
          "contributions": 21,
          "id": 1,
          "languages": {
              "CSS": 0.0517709957674315,
              "HTML": 0.0029627979505457,
              "JavaScript": 0.4323902873691245,
              "Other": 0.1196925818667854,
              "Python": 0.3507239919803965,
              "Ruby": 0.0384940966807752,
              "Shell": 0.0039652483849409
          },
          "username": "morganpdx"
      },
      {
          "contributions": 614,
          "id": 1,
          "languages": {
              "CSS": 0.3325098438477485,
              "HTML": 0.2200949425315555,
              "JavaScript": 0.0657090636998147,
              "Ruby": 0.3816861499208812
          },
          "username": "targess"
      },
      {
          "contributions": 417,
          "id": 2,
          "languages": {
              "CSS": 0.0004389064534126,
              "HTML": 0.0030351497117351,
              "JavaScript": 0.5739185419378836,
              "Other": 0.36113074204947,
              "Ruby": 0.0138590291984377,
              "Shell": 0.0285066021945322,
              "TypeScript": 0.0191110284545285
          },
          "username": "caged"
      },
      {
          "contributions": 88,
          "id": 2,
          "languages": {
              "CSS": 0.0021344101528699,
              "HTML": 0.1507931929622151,
              "JavaScript": 0.5454667820401884,
              "Other": 0.3016056148447265
          },
          "username": "mrmonroe"
      },
      {
          "contributions": 883,
          "id": 1,
          "languages": {
              "HTML": 0.000579042315446,
              "JavaScript": 0.999037527241486,
              "Other": 0.000347815054352,
              "Shell": 0.00003561538871586027
          },
          "username": "nzakas"
      },
      {
          "contributions": 421,
          "id": 1,
          "languages": {
              "CSS": 0.2125498415611958,
              "HTML": 0.0993234570044834,
              "JavaScript": 0.6881267014343208
          },
          "username": "markmhendrickson"
      },
      {
          "contributions": 663,
          "id": 1,
          "languages": {
              "CSS": 0.1393476669383855,
              "HTML": 0.0101933530978551,
              "JavaScript": 0.845441807155726,
              "Other": 0.0047621118270413,
              "PHP": 0.000029854465968504835,
              "Python": 0.0002252065150232
          },
          "username": "kpuputti"
      },
      {
          "contributions": 561,
          "id": 1,
          "languages": {
              "C": 0.0286872123627662,
              "C++": 0.2216225991122303,
              "Go": 0.0004208803538874,
              "HTML": 0.0075994740879282,
              "JavaScript": 0.622101906905675,
              "Other": 0.0051154009372576,
              "Python": 0.109442705853702,
              "R": 0.0003738109630006,
              "Shell": 0.0046360094235525
          },
          "username": "ThisIsMissEm"
      },
      {
          "contributions": 0,
          "id": 1,
          "languages": {
              "CSS": 0.1386749254579014,
              "HTML": 0.0588172653698707,
              "JavaScript": 0.7668074684083487,
              "Other": 0.035700340763879
          },
          "username": "missu"
      }
  ]);
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
      {/* <div>{matches[0]['username']}</div> */}
      <div className="cards-container">
      <UserCard pfp={tanay} name={username} lang="ffhdskjg" commit="300" showArrows={false} />
      <UserCard pfp={tanay} name={matches[curInd]['username']} lang={matches[curInd]['languages']} commit={matches[curInd]['contributions']} showArrows={true} />
      </div>

    </div>
  );
}
import React from 'react'
import '../styles/UserCard.css'

export default function UserCard(props) {
    const pfp = props.pfp;
    const name = props.name;
    const join = props.join;
    const lang = props.lang;
    const commit = props.commit;


    return (
      <div className="positioning-container">
        <div className="backdrop"></div>
        <div className="card-container">
          <img src={pfp} className="img" alt="profile" />
          <div className="name">{name}</div>
          <div className="text">Joined: {join}</div>
          <div className="text">Language breakdown: {lang}</div>
          <div className="text">Commits: {commit}</div>
        </div>
      </div>
      )
    }
import React from 'react';
import PieBreakdown from './PieBreakdown';
import '../styles/UserCard.css';

export default function UserCard(props) {
  const pfp = props.pfp;
  const name = props.name;
  const commit = props.commit;
  const lang = props.lang;

  return (
    <div className="positioning-container">
      <div className="backdrop"></div>
      <div className="card-container">
        <img src={pfp} className="img" alt="profile" />
        <div className="name">{name}</div>
        <div className="text">Commits: {commit}</div>
        <div className="pie-chart-container">
          <PieBreakdown list={lang}/>
        </div>
      </div>
    </div>
  );
}

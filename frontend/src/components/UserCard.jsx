import React from 'react';
import PieBreakdown from './PieBreakdown';
import '../styles/UserCard.css';
import downArrow from '../assets/down-arrow.svg';
import upArrow from '../assets/up-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';
import leftArrow from '../assets/left-arrow.svg';

export default function UserCard(props) {
  const pfp = props.pfp;
  const joindate = props.joindate;
  const name = props.name;
  const commit = props.commit;
  const showArrows = props.showArrows; // New prop to control displaying of arrows
  const showCircle = props.showCircle;
  const matched = props.matched;
  const lang = props.lang;
  const handleArrowClick = props.handleArrowClick;

  const colors = ["red", "gray", "green"]
  const full = { year: 'numeric', month: 'long', day: 'numeric' }
  const year = { year: 'numeric' }
  const displayDate = new Date(joindate).toLocaleDateString('en-US', full)
  const yearDate = new Date().toLocaleDateString('en-US', year)

  return (
    <div className="positioning-container">
      <div className="backdrop"></div>
      <div className={`card-container ${showArrows ? 'arrow-container' : ''}`}>
        {showCircle && <div className='swiped-circle' style={{background: colors[matched]}}></div>}
        <img src={pfp} className="img" alt="profile" />
        <a href={`https://github.com/${name}`} className="name">{name}</a>
        <div className="joindate">Joined: {displayDate}</div>
        <div className="text" style={{marginBottom: "16px"}}>Contributions in {yearDate}: {commit}</div>

        <PieBreakdown list={lang}/>

        {showArrows && (
          <>
            {/* Arrows are displayed here */}
            <img src={upArrow} alt="up arrow" className="arrow up" onClick={() => handleArrowClick("up")}/>

            <img src={rightArrow} alt="right arrow" className="arrow right" onClick={() => handleArrowClick("right")}/>
            <img src={downArrow} alt="down arrow" className="arrow down" onClick={() => handleArrowClick("down")}/>
            <img src={leftArrow} alt="left arrow" className="arrow left" onClick={() => handleArrowClick("left")}/>
          </>
        )}
      </div>
    </div>
  );
}

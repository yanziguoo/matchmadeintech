import React, { useState } from "react";
import "../styles/HomeScreen.css";
import { useNavigate } from "react-router-dom";
import bannerLogo from '../assets/banner logo.png';

export default function HomeScreen() {
  const [formData, setFormData] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/results`, {state: formData});
  };

  const bgStyles = {
    // ... existing properties
    justifyContent: 'center',  // Add this line
    alignItems: 'center',  // Add this line
};

  return (
    <>
      <div style={bgStyles}>
        <div className="upload-container" id="home">
          <img src={bannerLogo} alt="Your Logo" className="center-logo" />
          <label>
            <br></br>
            <b style={{ color: "white" }}>Enter your username here: </b>
          </label>
          <table>
            <tbody>
              <tr>
                <td>
                  <input
                    className='form-item'
                    type="string"
                    id="username"
                    name="username"
                    value={formData}
                    placeholder="Enter username here"
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button
                    className="form-button"
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Go
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

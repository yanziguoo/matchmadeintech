import React, { useState } from "react";
import "../styles/HomeScreen.css";
import { useNavigate } from "react-router-dom";


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
    // backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    width: "100vw",
    top:0,
    display: 'flex',
  };

  return (
    <>
      <div style={bgStyles}>
        <div className="upload-container" id="home">
          {/* <img src={centerLogo} alt="" className="center-logo" /> */}

          <label>
            <br></br>
            <b style={{ color: "black" }}>Enter your username here: </b>
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
                    value={formData.item}
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
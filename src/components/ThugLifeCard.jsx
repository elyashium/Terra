import React from "react";

const ThugLifeCard = ({ isHappy }) => {
  const imagePath = isHappy
    ? require("../images/happy.jpeg")
    : require("../images/Sad.jpeg");

  return (
    <div>
      <img src={imagePath} alt="Thug Life" height="200" width="200" style={{borderRadius:"5px"}} />
      <br/>
      <p>{isHappy? "You're an environment Saviour!" : "You're a Carbon Thug!"}</p>
    </div>
  );
};

export default ThugLifeCard;

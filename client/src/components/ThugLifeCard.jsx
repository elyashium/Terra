import React from "react";

import HappyImage from "/images/happy.png"
import SadImage from "/images/Sad.png"

const ThugLifeCard = ({ isHappy }) => {
  const imagePath = isHappy ? HappyImage : SadImage

  return (
    <div>
      <img src={imagePath} alt="Thug Life" height="200" width="200" style={{borderRadius:"5px"}} />
      <br/>
      <p>{isHappy? "You're an environment Saviour!" : "You're a Carbon Thug!"}</p>
    </div>
  );
};

export default ThugLifeCard;

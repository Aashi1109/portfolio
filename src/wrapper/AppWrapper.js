import React from "react";
import SocialMedia from "../components/SocialMedia";
import NavigationDots from "../components/NavigationDots";

const AppWrapper = (Component, idName, classNames) =>
  function HOC() {
    return (
      <div className={`app__container ${classNames}`} id={idName}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />
        </div>

        <NavigationDots active={idName}/>
      </div>
    );
  };

export default AppWrapper;

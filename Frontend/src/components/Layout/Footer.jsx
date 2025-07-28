import React, { useContext } from "react";
import { Context } from "../../main";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  const { isAuthorized } = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div>&copy; All Rights Reserved By SimranRajput.</div>
      <div>
        <Link to={"https://www.facebook.com/simransingh.rajput.9277?mibextid=ZbWKwL"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"https://www.youtube.com/@simransingh1099"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={"https://www.linkedin.com/in/simran-29as09"} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"https://www.instagram.com/simran._rajput_"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
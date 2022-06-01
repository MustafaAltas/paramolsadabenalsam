import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./style.css";

function Footer() {
  return (
    <div className="footer">
      <div>©Copyright 2022 Mustafa Altaş</div>
      <div>
        <a
          href="https://www.instagram.com/xmmuussx/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon className="icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/mustafa-alta%C5%9F-b49b77225/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon className="icon" />
        </a>
        <a
          href="https://github.com/D1183-Mustafa"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon className="icon" />
        </a>
      </div>
    </div>
  );
}

export default Footer;

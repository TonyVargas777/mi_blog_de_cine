import React from "react";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div>
        <b>---- &copy; Tony Vargas - FrontEnd Vercel - BackEnd Render ----</b>
        </div>
        <div className="red_footers">
          <article className="red_footer">
            <a
              href="https://linkedin.com/in/tony-vargas-garcía-122b1424b"
              target="_blank"
            >
              <img
                // className="red_footer"
                align="center"
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
                alt="LinkedIn"
                height="20px"
                width="20px"
                target="_blank"
              ></img>
            </a>
          </article>
          

          <article className="red_footer">
            <a href="https://wa.me/34661871759" target="_blank" title="WhatsApp">
              <img
                // className="red_footer"
                align="center"
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/whatsapp.svg"
                alt="WhatsApp"
                height="20px"
                width="20px"
              ></img>
            </a>
          </article>
          
          <article className="red_footer">
            <a
              href="https://github.com/TonyVargas777"
              alt="github"
              height="20px"
              width="20px"
              target="_blank"
            >
              <img
                // className="red_footer"
                align="center"
                src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
                alt="github"
                height="20px"
                width="20px"
                target="_blank"
              ></img>
            </a>
          </article>
         
          <article className="red_footer">
            <a
              href="mailto:tonacovargas@gmail.com"
              alt="github"
              height="20px"
              width="20px"
              target="_blank"
            >
              <img
                // className="red_footer"
                align="center"
                src="https://raw.githubusercontent.com/TonyVargas777/portafolio/main/public/img/email.png"
                alt="email"
                height="20px"
                width="20px"
                target="_blank"
              ></img>
            </a>
          </article>
          </div>
      </footer>
    </>
  );
};

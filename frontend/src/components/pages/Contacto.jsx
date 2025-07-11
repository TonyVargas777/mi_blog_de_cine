import React, { useEffect } from "react";

export const Contacto = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="jumbo">
      <h2>Contacto:</h2>
      <div className="articles">
      <article className="red">
        <a
          href="https://linkedin.com/in/tony-vargas-garcía-122b1424b"
          target="_blank"
        >
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="LinkedIn"
            height="40px"
            width="40px"
            target="_blank"
          ></img>
        </a>
      </article>
      <a
        href="https://linkedin.com/in/tony-vargas-garcía-122b1424b"
        alt="linkedin"
        target="_blank"
      >
        LinkedIn: Tony Vargas García
      </a>

      <article className="red">
        <a href="https://wa.me/34661871759" target="_blank" title="WhatsApp">
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/whatsapp.svg"
            alt="WhatsApp"
            height="40px"
            width="40px"
          ></img>
        </a>
      </article>
      <a href="https://wa.me/34661871759" alt="github" target="_blank">
        WhatsApp Number
      </a>
      <article className="red">
        <a
          href="https://github.com/TonyVargas777"
          alt="github"
          height="40px"
          width="40px"
          target="_blank"
        >
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
            alt="github"
            height="40px"
            width="40px"
            target="_blank"
          ></img>
        </a>
      </article>
      <a href="https://github.com/TonyVargas777" alt="github" target="_blank">
        GitHub: TonyVargas777
      </a>
      <article className="red">
        <a
          href="mailto:tonacovargas@gmail.com"
          alt="github"
          height="40px"
          width="40px"
          target="_blank"
        >
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/TonyVargas777/portafolio/main/public/img/email.png"
            alt="email"
            height="40px"
            width="40px"
            target="_blank"
          ></img>
        </a>
      </article>
      <a href="mailto:tonacovargas@hotmail.com" target="_blank">
        tonacovargas@gmail.com
      </a>
      
    </div>
    </div>
  );
};

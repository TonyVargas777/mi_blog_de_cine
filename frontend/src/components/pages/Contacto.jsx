import React, {useEffect} from "react";

export const Contacto = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="jumbo">
      <h1>Contacto:</h1>
      <article>
        <a
          href="https://linkedin.com/in/tony-vargas-garcía-122b1424b"
          target="blank"
        >
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg"
            alt="LinkedIn"
            height="40px"
            width="40px"
          ></img>
        </a>
      </article>
      <a
        href="https://linkedin.com/in/tony-vargas-garcía-122b1424b"
        alt="linkedin"
      >
        https://linkedin.com/in/tony-vargas-garcía-122b1424b
      </a>

      <div>
        <a href="https://wa.me/34661871759" target="blank" title="WhatsApp">
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/whatsapp.svg"
            alt="WhatsApp"
            height="40px"
            width="40px"
          ></img>
        </a>
      </div>
      <a href="https://wa.me/34661871759" alt="github">
        WhatsApp number: +34 661 87 17 59
      </a>
      <article>
        <a
          href="https://github.com/TonyVargas777"
          alt="github"
          height="40px"
          width="40px"
        >
          <img
            className="red"
            align="center"
            src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/github.svg"
            alt="github"
            height="40px"
            width="40px"
          ></img>
        </a>
      </article>
      <a href="https://github.com/TonyVargas777" alt="github">
        https://github.com/TonyVargas777
      </a>
      <article>
        <a href="mailto:tonacovargas@hotmail.com" target="blank">
          <img
            className="red"
            align="center"
            src="img/email.jpg"
            alt="email"
            height="40"
            width="40"
          ></img>
        </a>
      </article>
      <a href="mailto:tonacovargas@hotmail.com" target="blank">
        tonacovargas@hotmail.com
      </a>
    </div>
  );
};

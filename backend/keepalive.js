import fetch from "node-fetch";

setInterval(() => {
    console.log("Enviando solicitud keep-alive...");
    fetch("https://basedatosrender.onrender.com")
        .then((response) => console.log("Respuesta del keep-alive:", response.status))
        .catch((error) => console.error("Error en el keep-alive:", error));
}, 5 * 60 * 1000); // Cada 5 minutos


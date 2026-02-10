import React, { useEffect, useRef } from "react";
import bwipjs from "bwip-js"; // Asegúrate de que esta librería esté instalada: npm install bwip-js

const DynamicPDF417 = () => {
  // Referencia del canvas
  const canvasRef = useRef(null);

  // Función para generar un token dinámico (simulado)
  const generateDynamicToken = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 50; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  // Función para renderizar el PDF417 en el canvas
  const renderPDF417 = (data) => {
    try {
      const canvas = canvasRef.current; // Referencia al <canvas>
      bwipjs.toCanvas(canvas, {
        bcid: "pdf417", // Tipo de código (PDF417)
        text: data, // Información del código de barras
        scale: 2, // Escala para ajustar el tamaño
        height: 10, // Altura de las barras
        includetext: true, // Incluye el texto debajo del código
      });

      // Obtiene la imagen en base64
      const base64Image = canvas.toDataURL("image/png");
      console.log("Imagen Base64:", base64Image);
    } catch (err) {
      console.error("Error al renderizar el PDF417:", err);
    }
  };

  // Efecto para iniciar el renderizado del código de barras dinámico
  useEffect(() => {
    // Genera el primer token dinámico y renderiza
    const initialToken = generateDynamicToken();
    renderPDF417(initialToken);

    // Intervalo para actualizar el código cada 10 segundos
    const interval = setInterval(() => {
      const dynamicToken = generateDynamicToken();
      console.log("Nuevo token generado:", dynamicToken);
      renderPDF417(dynamicToken);
    }, 10000); // Intervalo de 10 segundos

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []); // El arreglo vacío [] asegura que esto corra una vez, al montar el componente

  return (
    <div>
      <canvas
        id="pdf417-canvas"
        ref={canvasRef}
        role="img"
        width="400"
        height="100"
        style={{
          boxSizing: "border-box",
          margin: "8px",
          padding: "0px",
          width: "200px",
          height: "50px",
          transform: "scaleY(1)",
        }}
      ></canvas>
    </div>
  );
};

export default DynamicPDF417;
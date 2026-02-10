import React, { useState, useEffect } from 'react';
import './LoadingMe.css';

export default function LoadingComponent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Simula un "loading" de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowContent(true);
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador
  }, []);

  return (
    <div>
      {isLoading && <div className="loading">Cargando...</div>}
      <div className={showContent ? 'fade-in' : 'hidden'}>
        <h1>¡Contenido cargado!</h1>
        <p>Este es el contenido que aparece después de la animación.</p>
      </div>
    </div>
  );
}
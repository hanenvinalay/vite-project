import { useState, useEffect } from "react";
import { Header, Footer } from "./Base";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado para el loading

  const handleOpenPanel = () => {
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
  };

  useEffect(() => {
    // Simula un "loading" de 3 segundos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Limpia el temporizador
  }, []);

  return (
    <div>
      {isLoading ? (
        // Muestra el indicador de carga mientras `isLoading` es true
        <div className="loading-screen">
<div className='sc-efb1ccd1-0 fydoZl'>
      <div className='sc-efb1ccd1-1 ekYeLz'>
        <div role='alert' tabIndex={0} className='sc-efb1ccd1-2 hzoUIk'>
          <div className='LoadingSpinner__Container-sc-1aovhdo-0 jbsZEO'>
            <span className='Spinner__AnimatedSpinner-sc-337kba-0 FtVvn' />
            <p className='LoadingSpinner__Message-sc-1aovhdo-1 fRkZxz'>
estamos atendiendo tu solicitud...            </p>
          </div>
        </div>
      </div>
    </div>        </div>
      ) : (
        // Renderiza el contenido principal cuando `isLoading` es false
        <>
          <Header onOpen={handleOpenPanel} />
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <Footer isOpen={isPanelOpen} onClose={handleClosePanel} />
        </>
      )}
    </div>
  );
}
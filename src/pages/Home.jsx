import { AsideModal } from '../components/Aside';

import React, { useState } from 'react';

export default function HomeCase() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log('Ticket added to wallet');
    setIsModalOpen(false);
    // Aquí va tu lógica de confirmación
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page content.</p>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <AsideModal isOpen={isModalOpen} onClose={handleClose} onConfirm={handleConfirm} />
    </div>
  );
}
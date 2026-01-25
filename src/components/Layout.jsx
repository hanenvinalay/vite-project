
import { useState } from "react"
import { Header, Footer } from "./Base"
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const handleOpenPanel = () => {
    setIsPanelOpen(true)
  }

  const handleClosePanel = () => {
    setIsPanelOpen(false)
  }
  return (
    <div>
      <Header onOpen={handleOpenPanel} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"><Outlet /></main>

      <Footer isOpen={isPanelOpen} onClose={handleClosePanel} />
    </div>
  );
}
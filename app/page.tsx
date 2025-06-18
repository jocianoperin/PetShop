"use client"

import { useState } from "react"
import { LoginForm } from "@/components/login-form"
import { Dashboard } from "@/components/dashboard"
import { FinanceiroPage } from "@/components/financeiro-page"
import { AgendaPage } from "@/components/agenda-page"
import { HotelPage } from "@/components/hotel-page"
import { PetsPage } from "@/components/pets-page"
import { PromocoesPage } from "@/components/promocoes-page"
import { RelatoriosPage } from "@/components/relatorios-page"
import { ConfiguracoesPage } from "@/components/configuracoes-page"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true)
      setCurrentPage("dashboard")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard")
  }

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "financeiro":
        return <FinanceiroPage />
      case "agenda":
        return <AgendaPage />
      case "hotel":
        return <HotelPage />
      case "pets":
        return <PetsPage />
      case "promocoes":
        return <PromocoesPage />
      case "relatorios":
        return <RelatoriosPage />
      case "configuracoes":
        return <ConfiguracoesPage />
      default:
        return <Dashboard />
    }
  }

  if (!isLoggedIn) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-background">
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-auto">{renderPage()}</main>
      </div>
    </ThemeProvider>
  )
}

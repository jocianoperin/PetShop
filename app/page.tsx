"use client"

import { useState, useEffect } from "react"
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
import { Header } from "@/components/header"
import { NotificationsPanel } from "@/components/notifications-panel"
import { ThemeProvider } from "@/components/theme-provider"

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notificationsPinned, setNotificationsPinned] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(6)

  const handleLogin = (username: string, password: string) => {
    if (username === "admin" && password === "123") {
      setIsLoggedIn(true)
      setCurrentPage("dashboard")
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage("dashboard")
    setSidebarCollapsed(false)
    setNotificationsOpen(false)
    setNotificationsPinned(false)
  }

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen)
  }

  const toggleNotificationsPin = () => {
    setNotificationsPinned(!notificationsPinned)
    if (!notificationsPinned) {
      setNotificationsOpen(true)
    }
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

  // Close notifications panel when clicking outside (only if not pinned)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!notificationsPinned && notificationsOpen) {
        const target = event.target as Element
        if (!target.closest("[data-notifications-panel]") && !target.closest("[data-notifications-trigger]")) {
          setNotificationsOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [notificationsOpen, notificationsPinned])

  if (!isLoggedIn) {
    return (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <Header
            onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            onNotificationsToggle={toggleNotifications}
            unreadNotifications={unreadNotifications}
            onLogout={handleLogout}
          />

          {/* Page Content */}
          <main className={`flex-1 overflow-auto transition-all duration-300 ${notificationsPinned ? "mr-80" : ""}`}>
            {renderPage()}
          </main>
        </div>

        {/* Notifications Panel */}
        <div data-notifications-panel>
          <NotificationsPanel
            isOpen={notificationsOpen}
            onToggle={toggleNotifications}
            isPinned={notificationsPinned}
            onPin={toggleNotificationsPin}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}

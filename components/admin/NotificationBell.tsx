"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Bell, Check } from "lucide-react"

const POLL_INTERVAL_MS = 10_000

export type NotificationItem = {
  id: number
  title: string
  message: string
  isRead: boolean
  createdAt: string
}

function playNewNotificationSound() {
  try {
    const Ctx = typeof window !== "undefined" ? window.AudioContext : null
    if (!Ctx) return
    const ctx = new Ctx()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.frequency.value = 800
    osc.type = "sine"
    gain.gain.setValueAtTime(0.15, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.15)
  } catch {
    // ignore
  }
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const previousUnreadCount = useRef<number>(-1)

  const fetchNotifications = useCallback(async () => {
    const res = await fetch("/api/notifications")
    if (res.ok) {
      const data = await res.json()
      const unreadCount = data.filter((n: NotificationItem) => !n.isRead).length
      if (
        previousUnreadCount.current >= 0 &&
        unreadCount > previousUnreadCount.current
      ) {
        playNewNotificationSound()
      }
      previousUnreadCount.current = unreadCount
      setNotifications(data)
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(fetchNotifications, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [fetchNotifications])

  const markAsRead = async (id: number) => {
    setLoading(true)
    const res = await fetch("/api/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    setLoading(false)
    if (res.ok) fetchNotifications()
  }

  const unreadCount = notifications.filter((n) => !n.isRead).length

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 shadow-sm hover:bg-gray-50 hover:text-gray-800 transition-colors"
        aria-label="Notificações"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-medium text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-10"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-96 rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-4 py-3">
              <h3 className="font-semibold text-gray-800">Notificações</h3>
            </div>
            <ul className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="px-4 py-8 text-center text-sm text-gray-500">
                  Nenhuma notificação
                </li>
              ) : (
                notifications.map((n) => (
                  <li
                    key={n.id}
                    className={`border-b border-gray-100 px-4 py-3 last:border-0 ${
                      n.isRead ? "bg-white" : "bg-amber-50/80"
                    }`}
                  >
                    <div className="flex justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-800 text-sm">{n.title}</p>
                        <p className="mt-0.5 text-sm text-gray-600">{n.message}</p>
                        <p className="mt-1 text-xs text-gray-400">
                          {new Date(n.createdAt).toLocaleString("pt-BR")}
                        </p>
                      </div>
                      {!n.isRead && (
                        <button
                          type="button"
                          onClick={() => markAsRead(n.id)}
                          disabled={loading}
                          className="shrink-0 rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
                        >
                          <Check className="h-3.5 w-3.5" /> Marcar como lida
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

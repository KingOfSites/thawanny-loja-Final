"use client"

import { useState, useEffect, useMemo } from "react"
import { CalendarDays, ChevronLeft, ChevronRight, Phone, Trash2 } from "lucide-react"

type Appointment = {
  id: number
  clientName: string
  clientPhone: string
  service: string | null
  dateStr: string
  time: string
  createdAt: string
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function AppointmentsCalendar() {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchAppointments = () => {
    setLoading(true)
    fetch(`/api/appointments?month=${monthKey}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setAppointments(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false))
  }

  const monthKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`

  useEffect(() => {
    fetchAppointments()
  }, [monthKey])

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth)

  const datesWithAppointments = useMemo(() => {
    const set = new Set<string>()
    appointments.forEach((a) => set.add(a.dateStr))
    return set
  }, [appointments])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else setCurrentMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else setCurrentMonth((m) => m + 1)
  }

  const formatDateBr = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-")
    return `${d}/${m}/${y}`
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir este agendamento?")) return
    setDeletingId(id)
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" })
    setDeletingId(null)
    if (res.ok) fetchAppointments()
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Calendário de agendamentos</h2>
      </div>

      <div className="p-6">
        {/* Navegação do mês */}
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            aria-label="Mês anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-semibold text-gray-800">
            {MONTHS[currentMonth]} {currentYear}
          </span>
          <button
            type="button"
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-100"
            aria-label="Próximo mês"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Grid do mês */}
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 font-medium mb-2">
          {WEEKDAYS.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-square" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
            const hasAppointments = datesWithAppointments.has(dateStr)
            return (
              <div
                key={day}
                className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm ${
                  hasAppointments
                    ? "bg-pink-100 text-pink-800 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {day}
                {hasAppointments && (
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-0.5" />
                )}
              </div>
            )
          })}
        </div>

        {/* Lista de agendamentos do mês */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <h3 className="text-sm font-semibold text-gray-800 mb-3">Horários marcados neste mês</h3>
          {loading ? (
            <p className="text-sm text-gray-500">Carregando...</p>
          ) : appointments.length === 0 ? (
            <p className="text-sm text-gray-500">Nenhum agendamento neste mês.</p>
          ) : (
            <ul className="space-y-3">
              {appointments.map((apt) => (
                <li
                  key={apt.id}
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-gray-100 bg-gray-50/80 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-gray-800">
                    {formatDateBr(apt.dateStr)} às {apt.time}
                  </span>
                  <span className="text-gray-700">{apt.clientName}</span>
                  {apt.clientPhone && (
                    <span className="inline-flex items-center gap-1 text-gray-600">
                      <Phone className="h-3.5 w-3.5" />
                      {apt.clientPhone}
                    </span>
                  )}
                  {apt.service && (
                    <span className="text-pink-600 truncate">{apt.service}</span>
                  )}
                  <button
                    type="button"
                    onClick={() => handleDelete(apt.id)}
                    disabled={deletingId === apt.id}
                    className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    title="Excluir agendamento"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

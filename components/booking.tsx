"use client"

import { useState, useMemo } from "react"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useLanguage } from "@/context/LanguageContext"

const timeSlots = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function Booking() {
  const { t, translations } = useLanguage()
  const serviceOptions = translations.booking.serviceOptions
  const weekdays = translations.booking.weekdays
  const months = translations.booking.months
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: "", phone: "", service: "" })
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const daysInMonth = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth])
  const firstDay = useMemo(() => getFirstDayOfWeek(currentYear, currentMonth), [currentYear, currentMonth])

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
    setSelectedDate(null)
    setSelectedTime(null)
  }

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day)
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    return date < todayDate
  }

  const isSunday = (day: number) => {
    return new Date(currentYear, currentMonth, day).getDay() === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    const dateStr = selectedDate != null
      ? `${selectedDate}/${currentMonth + 1}/${currentYear}`
      : ""
    const res = await fetch("/api/booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone || undefined,
        service: formData.service || undefined,
        date: dateStr,
        time: selectedTime,
      }),
    })
    if (res.ok) {
      setSubmitted(true)
    } else {
      setSubmitError(t("booking.errorConfirm"))
    }
  }

  const dateStr = selectedDate != null ? `${selectedDate}/${currentMonth + 1}/${currentYear}` : ""
  const confirmedMsg = t("booking.confirmedMessage")
    .replace("{name}", formData.name)
    .replace("{service}", formData.service)
    .replace("{date}", dateStr)
    .replace("{time}", selectedTime ?? "")

  if (submitted) {
    return (
      <section id="agenda" className="bg-aster py-24">
        <div className="mx-auto max-w-2xl px-4 text-center">
          <div className="rounded-2xl border border-border bg-ladies p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-raspberry/10">
              <Check className="h-8 w-8 text-raspberry" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-bold text-foreground">
              {t("booking.confirmedTitle")}
            </h2>
            <p
              className="mt-3 text-muted-foreground"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {confirmedMsg}
            </p>
            <p
              className="mt-2 text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("booking.whatsappConfirm")}
            </p>
            <button
              onClick={() => {
                setSubmitted(false)
                setSelectedDate(null)
                setSelectedTime(null)
                setFormData({ name: "", phone: "", service: "" })
              }}
              className="mt-8 rounded-full bg-raspberry px-8 py-3 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-raspberry-dark"
              style={{ fontFamily: "var(--font-lato)" }}
            >
              {t("booking.newBooking")}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="agenda" className="bg-aster py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="mb-3 text-xs tracking-[0.3em] uppercase text-raspberry"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("booking.badge")}
          </p>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("booking.title")}
          </h2>
          <div className="mx-auto mt-3 h-px w-16 bg-raspberry/40" />
          <p
            className="mt-6 text-base text-muted-foreground"
            style={{ fontFamily: "var(--font-lato)" }}
          >
            {t("booking.subtitle")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Calendar */}
          <div className="rounded-2xl border border-border bg-ladies p-6">
            {/* Month Navigation */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={prevMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-ladies-deep"
                aria-label={t("booking.prevMonth")}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <h3 className="font-serif text-lg font-semibold text-foreground">
                {months[currentMonth]} {currentYear}
              </h3>
              <button
                type="button"
                onClick={nextMonth}
                className="flex h-9 w-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-ladies-deep"
                aria-label={t("booking.nextMonth")}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="mt-4 grid grid-cols-7 gap-1" style={{ fontFamily: "var(--font-lato)" }}>
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days Grid */}
            <div className="mt-1 grid grid-cols-7 gap-1" style={{ fontFamily: "var(--font-lato)" }}>
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const disabled = isPast(day) || isSunday(day)
                const selected = selectedDate === day
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => {
                      setSelectedDate(day)
                      setSelectedTime(null)
                    }}
                    className={`flex h-10 w-full items-center justify-center rounded-lg text-sm transition-all duration-200 ${
                      selected
                        ? "bg-raspberry font-semibold text-white shadow-sm"
                        : disabled
                          ? "cursor-not-allowed text-muted-foreground/40"
                          : "text-foreground hover:bg-raspberry/10"
                    }`}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            {/* Time Slots */}
            {selectedDate && (
              <div className="mt-6">
                <h4
                  className="text-sm font-medium text-foreground"
                  style={{ fontFamily: "var(--font-lato)" }}
                >
                  {t("booking.availableTimes")}
                </h4>
                <div className="mt-3 grid grid-cols-3 gap-2" style={{ fontFamily: "var(--font-lato)" }}>
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
                        selectedTime === time
                          ? "border-raspberry bg-raspberry font-medium text-white"
                          : "border-border text-foreground hover:border-raspberry hover:text-raspberry"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="rounded-2xl border border-border bg-ladies p-6" style={{ fontFamily: "var(--font-lato)" }}>
            <h3 className="font-serif text-xl font-semibold text-foreground">
              {t("booking.yourData")}
            </h3>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  {t("booking.name")}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t("booking.namePlaceholder")}
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-foreground">
                  {t("booking.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder={t("booking.phonePlaceholder")}
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-foreground">
                  {t("booking.service")}
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="mt-1.5 w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground transition-colors focus:border-raspberry focus:outline-none focus:ring-1 focus:ring-raspberry"
                >
                  <option value="">{t("booking.servicePlaceholder")}</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Summary */}
            {selectedDate && selectedTime && (
              <div className="mt-6 rounded-lg bg-aster p-4">
                <p className="text-sm font-medium text-foreground">{t("booking.summary")}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("booking.date")}{" "}
                  <span className="font-semibold text-raspberry">
                    {selectedDate}/{currentMonth + 1}/{currentYear}
                  </span>
                </p>
                <p className="text-sm text-muted-foreground">
                  {t("booking.time")}{" "}
                  <span className="font-semibold text-raspberry">{selectedTime}</span>
                </p>
                {formData.service && (
                  <p className="text-sm text-muted-foreground">
                    {t("booking.serviceLabel")}{" "}
                    <span className="font-semibold text-raspberry">{formData.service}</span>
                  </p>
                )}
              </div>
            )}

            {submitError && (
              <p className="mt-4 text-sm text-red-600">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={!selectedDate || !selectedTime || !formData.name || !formData.phone || !formData.service}
              className="mt-6 w-full rounded-full bg-raspberry px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all duration-200 hover:bg-raspberry-dark hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t("booking.confirm")}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { Package, AlertTriangle, Plus, Trash2, Edit2, Check } from "lucide-react"
import { NotificationBell } from "@/components/admin/NotificationBell"
import { AppointmentsCalendar } from "@/components/admin/AppointmentsCalendar"

type StockItem = {
  id: number
  name: string
  quantity: number
  minimumAlert: number
  createdAt: string
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loginLoading, setLoginLoading] = useState(false)
  const [items, setItems] = useState<StockItem[]>([])
  const [loading, setLoading] = useState(false)
  const [formName, setFormName] = useState("")
  const [formQuantity, setFormQuantity] = useState(0)
  const [formMinimumAlert, setFormMinimumAlert] = useState(5)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editQuantity, setEditQuantity] = useState<number>(0)

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/stock")
    if (res.ok) {
      const data = await res.json()
      setItems(data)
    }
  }, [])

  useEffect(() => {
    if (authenticated) fetchItems()
  }, [authenticated, fetchItems])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoginLoading(true)
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setAuthenticated(true)
        setPassword("")
      } else {
        setError("Acesso negado")
      }
    } finally {
      setLoginLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formName.trim()) return
    setLoading(true)
    const res = await fetch("/api/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formName.trim(),
        quantity: formQuantity,
        minimumAlert: formMinimumAlert,
      }),
    })
    setLoading(false)
    if (res.ok) {
      setFormName("")
      setFormQuantity(0)
      setFormMinimumAlert(5)
      fetchItems()
    }
  }

  const handleUpdate = async (id: number) => {
    setLoading(true)
    const res = await fetch(`/api/stock/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: editQuantity }),
    })
    setLoading(false)
    if (res.ok) {
      setEditingId(null)
      fetchItems()
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Remover este item do estoque?")) return
    setLoading(true)
    const res = await fetch(`/api/stock/${id}`, { method: "DELETE" })
    setLoading(false)
    if (res.ok) fetchItems()
  }

  const startEdit = (item: StockItem) => {
    setEditingId(item.id)
    setEditQuantity(item.quantity)
  }

  const totalProducts = items.length
  const lowStockCount = items.filter((i) => i.quantity <= i.minimumAlert).length

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Acesso administrativo
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                autoFocus
              />
            </div>
            {error && (
              <p className="text-sm text-red-600 text-center font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full rounded-lg bg-gray-800 py-3 text-sm font-medium text-white hover:bg-gray-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Carregando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Controle de estoque
          </h1>
          <NotificationBell />
        </div>

        {/* Cards de resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
              <Package className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total de produtos</p>
              <p className="text-2xl font-semibold text-gray-800">{totalProducts}</p>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Estoque baixo</p>
              <p className="text-2xl font-semibold text-red-600">{lowStockCount}</p>
            </div>
          </div>
        </div>

        {/* Formulário novo item */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5" /> Novo item
          </h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-5">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Ex: Esmalte vermelho"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
              <input
                type="number"
                min={0}
                value={formQuantity}
                onChange={(e) => setFormQuantity(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alerta mínimo</label>
              <input
                type="number"
                min={0}
                value={formMinimumAlert}
                onChange={(e) => setFormMinimumAlert(Number(e.target.value) ?? 5)}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
              />
            </div>
            <div className="sm:col-span-3 flex items-end">
              <button
                type="submit"
                disabled={loading || !formName.trim()}
                className="w-full rounded-lg bg-pink-600 py-2.5 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Adicionar
              </button>
            </div>
          </form>
        </div>

        {/* Lista de itens */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-3">
            <h2 className="text-lg font-semibold text-gray-800">Itens no estoque</h2>
          </div>
          <ul className="divide-y divide-gray-200">
            {items.length === 0 ? (
              <li className="px-6 py-10 text-center text-gray-500">
                Nenhum item cadastrado. Adicione o primeiro acima.
              </li>
            ) : (
              items.map((item) => {
                const isLow = item.quantity <= item.minimumAlert
                const isEditing = editingId === item.id
                return (
                  <li
                    key={item.id}
                    className="px-6 py-4 flex flex-wrap items-center justify-between gap-3 hover:bg-gray-50/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        Alerta quando ≤ {item.minimumAlert}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {isEditing ? (
                        <>
                          <input
                            type="number"
                            min={0}
                            value={editQuantity}
                            onChange={(e) => setEditQuantity(Number(e.target.value) || 0)}
                            className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                          />
                          <button
                            type="button"
                            onClick={() => handleUpdate(item.id)}
                            disabled={loading}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                            title="Salvar"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            Cancelar
                          </button>
                        </>
                      ) : (
                        <>
                          <span
                            className={`font-semibold tabular-nums ${
                              isLow ? "text-red-600" : "text-gray-800"
                            }`}
                          >
                            {item.quantity} un.
                          </span>
                          {isLow && (
                            <span className="inline-flex items-center gap-1 rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
                              <AlertTriangle className="h-3.5 w-3.5" /> Estoque baixo
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => startEdit(item)}
                            disabled={loading}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                            title="Editar quantidade"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        disabled={loading}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                        title="Excluir"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )
              })
            )}
          </ul>
        </div>

        {/* Calendário de agendamentos */}
        <div className="mt-8">
          <AppointmentsCalendar />
        </div>
      </div>
    </div>
  )
}

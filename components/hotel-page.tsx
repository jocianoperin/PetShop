"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, differenceInDays } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Plus, Hotel, CalendarIcon, User, Clock, MapPin, Phone, AlertCircle, CheckCircle, XCircle } from "lucide-react"

const hospedagens = [
  {
    id: 1,
    petId: 101,
    petNome: "Luna",
    petFoto: "/placeholder.svg?height=60&width=60",
    tutorNome: "Maria Silva",
    tutorTelefone: "(11) 99999-1111",
    checkIn: "2025-06-16",
    checkOut: "2025-06-20",
    boxId: 1,
    status: "ativo",
    observacoes: "Pet nervoso, evitar barulhos altos",
    valorDiaria: 60.0,
  },
  {
    id: 2,
    petId: 102,
    petNome: "Thor",
    petFoto: "/placeholder.svg?height=60&width=60",
    tutorNome: "João Santos",
    tutorTelefone: "(11) 99999-2222",
    checkIn: "2025-06-17",
    checkOut: "2025-06-18",
    boxId: 3,
    status: "checkout_hoje",
    observacoes: "",
    valorDiaria: 60.0,
  },
  {
    id: 3,
    petId: 103,
    petNome: "Bella",
    petFoto: "/placeholder.svg?height=60&width=60",
    tutorNome: "Carlos Lima",
    tutorTelefone: "(11) 99999-3333",
    checkIn: "2025-06-15",
    checkOut: "2025-06-22",
    boxId: 5,
    status: "ativo",
    observacoes: "Medicação às 8h e 20h",
    valorDiaria: 60.0,
  },
  {
    id: 4,
    petId: 104,
    petNome: "Max",
    petFoto: "/placeholder.svg?height=60&width=60",
    tutorNome: "Ana Rodrigues",
    tutorTelefone: "(11) 99999-4444",
    checkIn: "2025-06-18",
    checkOut: "2025-06-25",
    boxId: 7,
    status: "ativo",
    observacoes: "Dieta especial - ração hipoalergênica",
    valorDiaria: 60.0,
  },
  {
    id: 5,
    petId: 105,
    petNome: "Mimi",
    petFoto: "/placeholder.svg?height=60&width=60",
    tutorNome: "Lucia Ferreira",
    tutorTelefone: "(11) 99999-5555",
    checkIn: "2025-06-17",
    checkOut: "2025-06-19",
    boxId: 8,
    status: "ativo",
    observacoes: "Gato - manter longe dos cães",
    valorDiaria: 50.0,
  },
]

const boxes = [
  { id: 1, nome: "Box 1", tipo: "Pequeno", capacidade: 1, ocupado: true },
  { id: 2, nome: "Box 2", tipo: "Pequeno", capacidade: 1, ocupado: false },
  { id: 3, nome: "Box 3", tipo: "Médio", capacidade: 1, ocupado: true },
  { id: 4, nome: "Box 4", tipo: "Médio", capacidade: 1, ocupado: false },
  { id: 5, nome: "Box 5", tipo: "Grande", capacidade: 2, ocupado: true },
  { id: 6, nome: "Box 6", tipo: "Grande", capacidade: 2, ocupado: false },
  { id: 7, nome: "Box 7", tipo: "Grande", capacidade: 2, ocupado: true },
  { id: 8, nome: "Box 8", tipo: "Gatos", capacidade: 1, ocupado: true },
]

const pets = [
  { id: 101, nome: "Luna", tutor: "Maria Silva", especie: "Canina", porte: "Grande" },
  { id: 102, nome: "Thor", tutor: "João Santos", especie: "Canina", porte: "Grande" },
  { id: 103, nome: "Bella", tutor: "Carlos Lima", especie: "Canina", porte: "Pequeno" },
  { id: 104, nome: "Max", tutor: "Ana Rodrigues", especie: "Canina", porte: "Médio" },
  { id: 105, nome: "Mimi", tutor: "Lucia Ferreira", especie: "Felina", porte: "Pequeno" },
]

export function HotelPage() {
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date>()
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date>()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-100 text-green-800 border-green-200"
      case "checkout_hoje":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelado":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getBoxColor = (ocupado: boolean, tipo: string) => {
    if (ocupado) {
      return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
    }
    switch (tipo) {
      case "Pequeno":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800"
      case "Médio":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
      case "Grande":
        return "bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-800"
      case "Gatos":
        return "bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800"
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-800"
    }
  }

  const calcularDias = (checkIn: string, checkOut: string) => {
    return differenceInDays(new Date(checkOut), new Date(checkIn))
  }

  const calcularTotal = (checkIn: string, checkOut: string, valorDiaria: number) => {
    const dias = calcularDias(checkIn, checkOut)
    return dias * valorDiaria
  }

  const boxesDisponiveis = boxes.filter((box) => !box.ocupado).length
  const boxesOcupados = boxes.filter((box) => box.ocupado).length
  const checkoutsHoje = hospedagens.filter((h) => h.status === "checkout_hoje").length

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hotel</h1>
          <p className="text-gray-600 dark:text-gray-400">Gerencie as hospedagens dos pets</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-orange-500 hover:from-cyan-600 hover:to-orange-600">
              <Plus className="w-4 h-4 mr-2" />
              Nova Hospedagem
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nova Hospedagem</DialogTitle>
              <DialogDescription>Registre uma nova hospedagem no hotel</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pet">Pet</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Selecione o pet" />
                    </SelectTrigger>
                    <SelectContent>
                      {pets.map((pet) => (
                        <SelectItem key={pet.id} value={pet.id.toString()}>
                          {pet.nome} - {pet.tutor} ({pet.porte})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="box">Box</Label>
                  <Select>
                    <SelectTrigger className="rounded-2xl">
                      <SelectValue placeholder="Selecione o box" />
                    </SelectTrigger>
                    <SelectContent>
                      {boxes
                        .filter((box) => !box.ocupado)
                        .map((box) => (
                          <SelectItem key={box.id} value={box.id.toString()}>
                            {box.nome} - {box.tipo}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal rounded-2xl">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedCheckIn ? format(selectedCheckIn, "PPP", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl">
                      <Calendar mode="single" selected={selectedCheckIn} onSelect={setSelectedCheckIn} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal rounded-2xl">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedCheckOut ? format(selectedCheckOut, "PPP", { locale: ptBR }) : "Selecionar data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-2xl">
                      <Calendar mode="single" selected={selectedCheckOut} onSelect={setSelectedCheckOut} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="valor">Valor da Diária</Label>
                  <Input id="valor" type="number" placeholder="60,00" className="rounded-2xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone do Tutor</Label>
                  <Input id="telefone" placeholder="(11) 99999-9999" className="rounded-2xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" placeholder="Observações especiais sobre o pet" className="rounded-2xl" />
              </div>
              {selectedCheckIn && selectedCheckOut && (
                <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-sm text-cyan-700 dark:text-cyan-400">
                    <strong>Período:</strong> {differenceInDays(selectedCheckOut, selectedCheckIn)} dias
                  </p>
                  <p className="text-sm text-cyan-700 dark:text-cyan-400">
                    <strong>Total estimado:</strong> R${" "}
                    {(differenceInDays(selectedCheckOut, selectedCheckIn) * 60).toFixed(2).replace(".", ",")}
                  </p>
                </div>
              )}
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-2xl">
                  Cancelar
                </Button>
                <Button className="rounded-2xl bg-gradient-to-r from-cyan-500 to-orange-500">
                  Registrar Hospedagem
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Boxes Disponíveis</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{boxesDisponiveis}</p>
              </div>
              <div className="p-3 rounded-2xl bg-green-100 dark:bg-green-900">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Boxes Ocupados</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{boxesOcupados}</p>
              </div>
              <div className="p-3 rounded-2xl bg-red-100 dark:bg-red-900">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Check-outs Hoje</p>
                <p className="text-2xl font-bold text-yellow-600 mt-1">{checkoutsHoje}</p>
              </div>
              <div className="p-3 rounded-2xl bg-yellow-100 dark:bg-yellow-900">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Taxa de Ocupação</p>
                <p className="text-2xl font-bold text-cyan-600 mt-1">
                  {Math.round((boxesOcupados / boxes.length) * 100)}%
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-900">
                <Hotel className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Mapa de Boxes */}
        <Card className="lg:col-span-2 rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-purple-600" />
              Mapa de Boxes
            </CardTitle>
            <CardDescription>Status atual de todos os boxes do hotel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {boxes.map((box) => {
                const hospedagem = hospedagens.find((h) => h.boxId === box.id && h.status !== "cancelado")

                return (
                  <div
                    key={box.id}
                    className={`p-4 rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${getBoxColor(box.ocupado, box.tipo)}`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center shadow-sm">
                        <Hotel className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white">{box.nome}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{box.tipo}</p>
                      {hospedagem && (
                        <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded-xl">
                          <p className="text-xs font-medium text-gray-900 dark:text-white">{hospedagem.petNome}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {calcularDias(hospedagem.checkIn, hospedagem.checkOut)} dias
                          </p>
                        </div>
                      )}
                      <Badge
                        variant="outline"
                        className={`mt-2 text-xs ${box.ocupado ? "border-red-500 text-red-700" : "border-green-500 text-green-700"}`}
                      >
                        {box.ocupado ? "Ocupado" : "Disponível"}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Check-outs Hoje */}
        <Card className="rounded-3xl border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              Check-outs Hoje
            </CardTitle>
            <CardDescription>Pets com saída prevista para hoje</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hospedagens
              .filter((h) => h.status === "checkout_hoje")
              .map((hospedagem) => (
                <div
                  key={hospedagem.id}
                  className="p-4 rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={hospedagem.petFoto || "/placeholder.svg"}
                      alt={hospedagem.petNome}
                      className="w-12 h-12 rounded-2xl object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{hospedagem.petNome}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{hospedagem.tutorNome}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Box {hospedagem.boxId} • {calcularDias(hospedagem.checkIn, hospedagem.checkOut)} dias
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      Total: R${" "}
                      {calcularTotal(hospedagem.checkIn, hospedagem.checkOut, hospedagem.valorDiaria)
                        .toFixed(2)
                        .replace(".", ",")}
                    </span>
                    <Button size="sm" className="rounded-xl bg-yellow-600 hover:bg-yellow-700">
                      Check-out
                    </Button>
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Lista de Hospedagens Ativas */}
      <Card className="rounded-3xl border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-cyan-600" />
            Hospedagens Ativas
          </CardTitle>
          <CardDescription>Todos os pets atualmente hospedados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {hospedagens
              .filter((h) => h.status === "ativo")
              .map((hospedagem) => (
                <div
                  key={hospedagem.id}
                  className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={hospedagem.petFoto || "/placeholder.svg"}
                        alt={hospedagem.petNome}
                        className="w-16 h-16 rounded-2xl object-cover"
                      />
                      <div>
                        <p className="font-bold text-lg text-gray-900 dark:text-white">{hospedagem.petNome}</p>
                        <p className="text-gray-600 dark:text-gray-400">{hospedagem.tutorNome}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <Phone className="w-4 h-4" />
                            {hospedagem.tutorTelefone}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <MapPin className="w-4 h-4" />
                            Box {hospedagem.boxId}
                          </div>
                        </div>
                        {hospedagem.observacoes && (
                          <div className="flex items-center gap-1 mt-2">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            <p className="text-sm text-amber-700 dark:text-amber-400">{hospedagem.observacoes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`rounded-xl ${getStatusColor(hospedagem.status)}`}>
                          {hospedagem.status === "ativo" ? "Ativo" : hospedagem.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check-in: {new Date(hospedagem.checkIn).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Check-out: {new Date(hospedagem.checkOut).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-lg font-bold text-cyan-600 mt-1">
                        R${" "}
                        {calcularTotal(hospedagem.checkIn, hospedagem.checkOut, hospedagem.valorDiaria)
                          .toFixed(2)
                          .replace(".", ",")}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {calcularDias(hospedagem.checkIn, hospedagem.checkOut)} dias
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

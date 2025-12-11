import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  type ReactNode,
} from "react"

// Ticket type definition based on PaymentSuccess LocationState but with an ID
export type Ticket = {
  id: string
  movieTitle: string
  posterUrl: string
  rating: string
  duration: string
  genre: string
  date: string
  time: string
  theaterName: string
  ticketType: string
  seatString: string // e.g., "A1, A2"
  finalTotalPrice: number
  orderId: string
  paymentMethod: string // e.g., "Line Pay"
  purchaseDate: number // timestamp
  status: "active" | "used" | "expired"
  participantCount: number // Derived from seat count usually
}

type TicketContextType = {
  tickets: Ticket[]
  addTicket: (ticket: Omit<Ticket, "id" | "purchaseDate" | "status">) => void
  getTicket: (id: string) => Ticket | undefined
}

const TicketContext = createContext<TicketContextType | undefined>(undefined)

export const TicketProvider = ({ children }: { children: ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>(() => {
    // Load from local storage on initial render
    const savedTickets = localStorage.getItem("tickets")
    return savedTickets ? JSON.parse(savedTickets) : []
  })

  useEffect(() => {
    // Save to local storage whenever tickets change
    localStorage.setItem("tickets", JSON.stringify(tickets))
  }, [tickets])

  const addTicket = useCallback((newTicketData: Omit<Ticket, "id" | "purchaseDate" | "status">) => {
    const newTicket: Ticket = {
      ...newTicketData,
      id: crypto.randomUUID(),
      purchaseDate: Date.now(),
      status: "active",
    }
    setTickets((prev) => [newTicket, ...prev])
  }, [])

  const getTicket = useCallback(
    (id: string) => {
      return tickets.find((t) => t.id === id)
    },
    [tickets]
  )

  const value = useMemo(() => ({ tickets, addTicket, getTicket }), [tickets, addTicket, getTicket])

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
}

export const useTickets = () => {
  const context = useContext(TicketContext)
  if (context === undefined) {
    throw new Error("useTickets must be used within a TicketProvider")
  }
  return context
}

import { useNavigate } from "react-router-dom"
import CheckoutGhostIcon from "@/assets/icon/checkout-flow/checkout-ghost.svg?react"
import FooterButton from "@/components/checkout/FooterButton"

type TimeoutModalProps = {
  isOpen: boolean
}

const TimeoutModal = ({ isOpen }: TimeoutModalProps) => {
  const navigate = useNavigate()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="flex w-full flex-col items-center rounded-[10px] bg-white p-4 text-center">
        <CheckoutGhostIcon className="mb-3" />
        <h3 className="mb-2 text-xl font-semibold text-black">購票失敗</h3>
        <p className="mb-6 text-[#777777]">超過時間未完成購票，座位已被系統釋出，請重新進行購票</p>
        <FooterButton onClick={() => navigate("/")} className="py-[10px] font-semibold">
          返回電影頁面
        </FooterButton>
      </div>
    </div>
  )
}

export default TimeoutModal

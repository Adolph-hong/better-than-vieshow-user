import { useEffect, useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { ClockLoader } from "react-spinners"
import { confirmLinePay } from "@/services/paymentAPI"
import toast from "react-hot-toast"

const CheckoutConfirm = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const transactionId = searchParams.get("transactionId")
  const urlOrderId = searchParams.get("orderId")
  const hasCalledApi = useRef(false)

  useEffect(() => {
    if (hasCalledApi.current) return
    hasCalledApi.current = true

    const confirmPayment = async () => {
      // 嘗試從 localStorage 取得正確的 checkout_state
      const savedState = localStorage.getItem("checkout_state")
      let effectiveOrderId: any = urlOrderId

      console.log("Debug: urlOrderId from searchParams:", urlOrderId)
      console.log("Debug: savedState from localStorage:", savedState ? "Found" : "Not Found")

      if (savedState) {
        try {
          const checkoutData = JSON.parse(savedState)
          if (checkoutData.orderId) {
            effectiveOrderId = checkoutData.orderId
            console.log("Debug: effectiveOrderId from localStorage:", effectiveOrderId)
          }
        } catch (e) {
          console.error("Failed to parse saved state", e)
        }
      }

      // 重要：確保 orderId 是 Number 型別，避免後端因為型別錯誤而拒絕確認
      if (effectiveOrderId && typeof effectiveOrderId === "string") {
        const parsedId = parseInt(effectiveOrderId, 10)
        if (!isNaN(parsedId)) {
          effectiveOrderId = parsedId
          console.log("Debug: Converted effectiveOrderId to number:", effectiveOrderId)
        }
      }

      if (!transactionId || !effectiveOrderId) {
        toast.error("無效的付款資訊")
        console.error("Error: Missing transactionId or effectiveOrderId", { transactionId, effectiveOrderId })
        navigate("/checkout")
        return
      }

      try {
        console.log("Navigating Confirm API with:", { transactionId, orderId: effectiveOrderId })
        const response = await confirmLinePay({
          transactionId,
          orderId: effectiveOrderId,
        })
        console.log("Line Pay Confirm Response:", response)

        // 兼容結構內容：如果有 success 且為 true，或是回傳內容包含 transactionId (扁平結構)
        const isSuccess = response.success || (response as any).transactionId

        if (isSuccess) {
          // 從 localStorage 恢復場次與電影資訊
          const currentSavedState = localStorage.getItem("checkout_state")
          if (currentSavedState) {
            const checkoutData = JSON.parse(currentSavedState)
            // 成功後清除 localStorage，避免污染下一次訂單
            localStorage.removeItem("checkout_state")
            
            toast.success("付款成功！")
            navigate("/payment/success", { state: checkoutData })
          } else {
            toast.success("付款成功！")
            navigate("/")
          }
        } else {
          toast.error(response.message || "付款失敗")
          // 顯示失敗原因後跳回結帳頁
          setTimeout(() => {
            const stateToRestore = localStorage.getItem("checkout_state")
            navigate("/checkout", { state: stateToRestore ? JSON.parse(stateToRestore) : null })
          }, 3000)
        }
      } catch (err) {
        console.error("Confirm Payment Error:", err)
        toast.error("確認付款時發生錯誤")
        setTimeout(() => {
          const stateToRestore = localStorage.getItem("checkout_state")
          navigate("/checkout", { state: stateToRestore ? JSON.parse(stateToRestore) : null })
        }, 3000)
      }
    }

    confirmPayment()
  }, [transactionId, urlOrderId, navigate])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center gap-6">
        <ClockLoader color="#11968D" size={60} />
        <p className="text-lg font-medium">正在確認付款狀態…</p>
      </div>
    </div>
  )
}

export default CheckoutConfirm

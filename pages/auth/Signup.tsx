import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Check } from "lucide-react"
import toast from "react-hot-toast"
import AuthButton from "@/components/AuthButton"
import AuthInput from "@/components/AuthInput"
import AuthLayout from "@/components/AuthLayout"
import sendAPI from "@/utils/sendAPI"

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
    // 清除該欄位的錯誤
    if (id === "email" || id === "password") {
      setErrors((prev) => ({ ...prev, [id]: "" }))
    }
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { id, value } = e.target

    if (id === "email" && value && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Email format invalid" }))
    }

    if (id === "password" && value && value.length < 8) {
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }))
    }
  }

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    // 前端驗證
    let hasError = false
    const newErrors = { email: "", password: "" }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email format invalid"
      hasError = true
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      hasError = true
    }

    if (hasError) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)

    try {
      const response = await sendAPI(`/api/Auth/register`, "POST", formData)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.message || ""

        // 處理後端錯誤
        if (
          errorMessage.toLowerCase().includes("email") ||
          errorMessage.toLowerCase().includes("exist")
        ) {
          setErrors((prev) => ({ ...prev, email: "Email already exist" }))
        } else {
          toast.error(errorMessage || "註冊失敗，請稍後再試")
        }
        return
      }

      // 註冊成功
      toast.success("註冊成功！請登入")
      navigate("/login")
    } catch {
      // 網路錯誤
      toast.error("發生錯誤，請稍後再試")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="註冊"
      footer={
        <p className="text-sm text-white">
          已經有帳號?{" "}
          <Link to="/login" className="text-sm text-[#11968D]">
            登入
          </Link>
        </p>
      }
    >
      <AuthInput
        id="name"
        label="名稱"
        type="text"
        placeholder="輸入名稱"
        value={formData.name}
        onChange={handleInputChange}
      />
      <AuthInput
        id="email"
        label="信箱"
        type="email"
        placeholder="輸入信箱"
        value={formData.email}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.email}
      />

      <AuthInput
        id="password"
        label="密碼"
        type={showPassword ? "text" : "password"}
        placeholder="輸入密碼"
        value={formData.password}
        onChange={handleInputChange}
        onBlur={handleBlur}
        error={errors.password}
        rightElement={
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye className="text-[#777777]" />
            ) : (
              <EyeClosed className="text-[#777777]" />
            )}
          </button>
        }
      />

      <div className="flex items-center gap-2 py-6 pt-4">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            id="remember"
            className="peer size-4 cursor-pointer appearance-none rounded border border-[#A5A5A5] bg-[#1F1F1F] transition-all checked:border-white checked:bg-white"
          />
          <Check
            size={14}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1F1F1F] opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </div>
        <label htmlFor="remember" className="cursor-pointer text-sm text-[#E5E5E5]">
          記住我
        </label>
      </div>

      <AuthButton type="submit" onClick={handleRegister} loading={isLoading}>
        註冊
      </AuthButton>
    </AuthLayout>
  )
}

export default Signup

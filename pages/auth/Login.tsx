import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Check } from "lucide-react"
import toast from "react-hot-toast"
import AuthButton from "@/components/auth-ui/AuthButton"
import AuthInput from "@/components/auth-ui/AuthInput"
import AuthLayout from "@/components/auth-ui/AuthLayout"
import sendAPI from "@/utils/sendAPI"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
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

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // 清除之前的錯誤
    setErrors({ email: "", password: "" })
    setIsLoading(true)

    try {
      const response = await sendAPI(`/api/Auth/login`, "POST", formData)

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.message || ""
        const errorMessageLower = errorMessage.toLowerCase()

        // 根據後端錯誤訊息判斷是哪個欄位的問題（支援中英文關鍵字）
        const isEmailError =
          errorMessageLower.includes("email") ||
          errorMessageLower.includes("not found") ||
          errorMessage.includes("信箱") ||
          errorMessage.includes("用戶不存在") ||
          response.status === 404

        const isPasswordError =
          errorMessageLower.includes("password") ||
          errorMessageLower.includes("incorrect") ||
          errorMessageLower.includes("wrong") ||
          errorMessage.includes("密碼")

        if (isEmailError) {
          setErrors({ email: "Email not found", password: "" })
        } else if (isPasswordError) {
          setErrors({ email: "", password: "Password incorrect" })
        } else {
          // 預設顯示在密碼欄位
          setErrors({ email: "", password: "Password incorrect" })
        }
        return
      }

      const data = await response.json()

      const token = data.token || data.accessToken || data?.data?.token

      if (token) {
        localStorage.setItem("token", token)

        const userName = data.name || data.user?.name || data?.data?.name
        if (userName) {
          localStorage.setItem("user", userName)
        }
      }

      toast.success("登入成功")
      navigate("/")
    } catch {
      // 網路錯誤
      toast.error("發生錯誤，請稍後再試")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout
      title="登入"
      footer={
        <p className="text-sm text-white">
          沒有帳號?{" "}
          <Link to="/signup" className="text-sm text-[#11968D]">
            註冊
          </Link>
        </p>
      }
    >
      <AuthInput
        id="email"
        label="信箱"
        type="email"
        placeholder="輸入信箱"
        autoComplete="email"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
      />

      <AuthInput
        id="password"
        label="密碼"
        type={showPassword ? "text" : "password"}
        placeholder="輸入密碼"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleInputChange}
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
            size={12}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1F1F1F] opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </div>
        <label htmlFor="remember" className="cursor-pointer text-sm text-[#E5E5E5]">
          記住我
        </label>
      </div>

      <AuthButton type="submit" onClick={handleLogin} loading={isLoading}>
        登入
      </AuthButton>
    </AuthLayout>
  )
}

export default Login

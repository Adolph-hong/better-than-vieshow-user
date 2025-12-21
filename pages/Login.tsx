import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Check } from "lucide-react"
import AuthButton from "@/components/AuthButton"
import AuthInput from "@/components/AuthInput"
import AuthLayout from "@/components/AuthLayout"

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://better-than-vieshow-api.rocket-coding.com/api/Auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.message || "登入失敗，請稍後再試"
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("登入成功回傳資料:", data) // 方便除錯確認欄位

      // 依照常見 API 格式，Token 可能在 data.token, data.accessToken 或 data.data.token
      // 這裡先以 data.token 為主，並加上防呆
      const token = data.token || data.accessToken || data?.data?.token

      if (token) {
        localStorage.setItem("token", token)

        // 如果有使用者名稱也一併儲存
        const userName = data.name || data.user?.name || data?.data?.name
        if (userName) {
          localStorage.setItem("user", userName)
        }
      } else {
        console.warn("後端未回傳 token", data)
        // 選擇性：如果沒 token 視為登入異常，也可以在這邊 throw Error
      }

      alert("登入成功！")
      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert("發生未知錯誤")
      }
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
        value={formData.email}
        onChange={handleInputChange}
      />

      <AuthInput
        id="password"
        label="密碼"
        type={showPassword ? "text" : "password"}
        placeholder="輸入密碼"
        value={formData.password}
        onChange={handleInputChange}
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

      <AuthButton type="submit" onClick={handleLogin}>
        登入
      </AuthButton>
    </AuthLayout>
  )
}

export default Login

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeClosed, Check } from "lucide-react"
import AuthButton from "@/components/AuthButton"
import AuthInput from "@/components/AuthInput"
import AuthLayout from "@/components/AuthLayout"

const Signup = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
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

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const response = await fetch(
        "https://better-than-vieshow-api.rocket-coding.com/api/Auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )

      if (!response.ok) {
        // 嘗試解析錯誤訊息，如果後端有回傳 JSON 格式錯誤
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.message || "註冊失敗，請稍後再試"
        throw new Error(errorMessage)
      }

      // 註冊成功
      alert("註冊成功！請登入")
      navigate("/login")
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
      title="註冊"
      paddingTop="pt-[145px]"
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
            size={14}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#1F1F1F] opacity-0 peer-checked:opacity-100"
            strokeWidth={3}
          />
        </div>
        <label htmlFor="remember" className="cursor-pointer text-sm text-[#E5E5E5]">
          記住我
        </label>
      </div>

      <AuthButton type="submit" onClick={handleRegister}>
        註冊
      </AuthButton>
    </AuthLayout>
  )
}

export default Signup

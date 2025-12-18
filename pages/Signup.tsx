import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeClosed, Check } from "lucide-react"
import AuthButton from "@/components/AuthButton"
import AuthInput from "@/components/AuthInput"
import AuthLayout from "@/components/AuthLayout"

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <AuthLayout
      title="註冊"
      paddingTop="pt-[145px]"
      footer={
        <p className="text-white">
          已經有帳號?{" "}
          <Link to="/login" className="text-[#11968D]">
            登入
          </Link>
        </p>
      }
    >
      <AuthInput id="name" label="名稱" type="text" placeholder="輸入名稱" />
      <AuthInput id="email" label="信箱" type="email" placeholder="輸入信箱" />

      <AuthInput
        id="password"
        label="密碼"
        type={showPassword ? "text" : "password"}
        placeholder="輸入密碼"
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

      <AuthButton>註冊</AuthButton>
    </AuthLayout>
  )
}

export default Signup

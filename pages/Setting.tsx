import { useNavigate } from "react-router-dom"
import avatar1 from "@/assets/user/avatar1.svg"
import avatar10 from "@/assets/user/avatar10.svg"
import avatar2 from "@/assets/user/avatar2.svg"
import avatar3 from "@/assets/user/avatar3.svg"
import avatar4 from "@/assets/user/avatar4.svg"
import avatar5 from "@/assets/user/avatar5.svg"
import avatar6 from "@/assets/user/avatar6.svg"
import avatar7 from "@/assets/user/avatar7.svg"
import avatar8 from "@/assets/user/avatar8.svg"
import avatar9 from "@/assets/user/avatar9.svg"
import Footer from "@/components/shared/Footer"

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
]

const Setting = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const userName = localStorage.getItem("user") || ""
  const userEmail = localStorage.getItem("userEmail") || ""
  const isLoggedIn = !!token

  const getAvatar = () => {
    if (!isLoggedIn) return null
    const avatarIndex = localStorage.getItem("userAvatarIndex")
    if (avatarIndex !== null) {
      const index = parseInt(avatarIndex, 10)
      if (index >= 0 && index < avatars.length) {
        return avatars[index]
      }
    }
    return null
  }

  const avatar = getAvatar()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("userEmail")
    window.location.reload()
  }

  const handleLogin = () => {
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-[#121212]">
      <div className="flex w-full flex-col">
        <h1 className="font-family-inter py-3 text-center text-xl leading-[1.2] font-semibold text-[#f2f2f2]">
          設定
        </h1>
        <div className="flex flex-col items-center py-4">
          {isLoggedIn && avatar && (
            <img src={avatar} alt="使用者頭像" className="mb-2 h-20 w-20 rounded-full" />
          )}
          <span className="font-family-inter mb-1 text-2xl leading-[1.2] font-semibold text-white">
            {isLoggedIn ? userName : "未登入"}
          </span>
          {isLoggedIn && userEmail && (
            <span className="font-family-inter leading-normal font-normal text-[#9E9E9E]">
              {userEmail}
            </span>
          )}
        </div>
        <div className="flex px-4 py-2.5">
          <button
            type="button"
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="flex h-10 w-full items-center justify-center rounded-lg bg-[#11968D]"
          >
            <span className="font-family-inter leading-normal font-normal text-white">
              {isLoggedIn ? "登出" : "登入"}
            </span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Setting

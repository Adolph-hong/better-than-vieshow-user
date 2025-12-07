import userLogo from "@/assets/icon/userLogo.svg"

const Header = () => {
    return (
        <div className="flex gap-1 justify-center items-center py-2 mt-1 z-100 mb-4">
            <img src={userLogo} alt="userLogo" />
            <div className="flex gap-1  text-[#E5E5E5]">
                <span className="flex items-center font-family-inter font-bold text-xs leading-[1.2]">Better Than</span>
                <span className="flex items-center font-family-noto-serif font-semibold text-sm leading-[1.2]">威秀</span>
            </div>
        </div>
    )
}

export default Header
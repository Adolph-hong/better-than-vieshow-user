import userLogo from "@/assets/icon/userLogo.svg"

const Header = () => {
    return (
        <div className="flex gap-1 justify-center items-center z-100 py-6">
            <img src={userLogo} alt="userLogo" className="w-9.5 h-6" />
            <div className="flex gap-1  text-[#E5E5E5]">
                <span className="flex items-center font-family-inter font-bold text-sm leading-normal">Better Than</span>
                <span className="flex items-center font-family-noto-serif font-semibold leading-normal">威秀</span>
            </div>
        </div>
    ) 
}

export default Header
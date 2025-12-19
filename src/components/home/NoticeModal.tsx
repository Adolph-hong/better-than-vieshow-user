import yuurei from "@/assets/icon/yuurei.svg"

interface NoticeModalProps {
  isOpen: boolean
  onClose: () => void
}

const NoticeModal = ({ isOpen, onClose }: NoticeModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full bg-white rounded-[10px] p-4 flex flex-col items-center">
        <img src={yuurei} alt="yuurei"  />
        <div className="flex flex-col items-center gap-3 mt-3 mb-6">
            <h2 className="font-family-inter text-xl leading-[1.2] font-semibold text-black">
            提醒您
            </h2>
            <p className="font-family-inter font-normal text-[#777777] text-center leading-normal w-full">
            這個網站為學生專題作品, 僅提供學習與展示使用, 並非真實服務貨商業網站
            </p>
        </div>

        <button
        onClick={onClose}
        className="w-full bg-[#11968D] text-white font-family-inter font-semibold leading-normal py-2.5 rounded-lg hover:bg-[#0d7a73] transition-colors"
        >
        知道了
        </button>
      </div>
    </div>
  )
}

export default NoticeModal


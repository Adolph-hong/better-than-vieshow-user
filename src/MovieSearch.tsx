import { Search } from 'lucide-react';
import Footer from "@/components/home/Footer"

const MovieSearch = () => {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#121212]">
      <div className="flex flex-col mt-3 gap-3 w-full px-3">
        <h1 className="font-family-inter font-bold text-2xl text-[#f2f2f2] leading-normal">搜尋</h1>
        <div className="flex gap-3 w-full rounded-xl p-3 bg-[#5D5D5D]">
          <Search className="w-6 h-6 text-[#BABABA]" />
          <input placeholder="搜尋電影名稱" type="text" className="w-full text-white placeholder:text-[#BABABA] outline-none"/>
        </div>
      </div>
      <Footer bottomStyle="bottom-4" />
    </div>
  )
}

export default MovieSearch
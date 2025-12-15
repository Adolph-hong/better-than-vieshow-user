import Footer from "@/components/home/Footer"
import HeroBanner from "@/components/home/HeroBanner"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#121212] w-full max-w-screen overflow-x-hidden">
      <HeroBanner/>
      {children}
      <Footer />
    </div>
  )
}

export default Layout
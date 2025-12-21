import HeroBanner from "@/components/home/HeroBanner"
import Footer from "@/components/shared/Footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full max-w-screen flex-col items-center overflow-x-hidden bg-[#121212]">
      <HeroBanner />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

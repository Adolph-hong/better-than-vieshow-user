import HeroBanner from "@/components/home/HeroBanner"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen items-center bg-[#121212]">
      <HeroBanner/>
      {children}
    </div>
  )
}

export default Layout
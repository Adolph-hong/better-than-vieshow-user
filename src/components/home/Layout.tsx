import HeroBanner from "@/components/home/HeroBanner"
import type { Movie } from "@/components/home/movieListData"
import Footer from "@/components/shared/Footer"

interface LayoutProps {
  children: React.ReactNode
  carouselMovies?: Movie[]
}

const Layout = ({ children, carouselMovies = [] }: LayoutProps) => {
  return (
    <div className="flex min-h-screen w-full max-w-screen flex-col items-center overflow-x-hidden bg-[#121212]">
      <HeroBanner movies={carouselMovies} />
      {children}
      <Footer />
    </div>
  )
}

export default Layout

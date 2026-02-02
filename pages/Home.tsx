import { useState, useEffect } from "react"
import { PuffLoader } from "react-spinners"
import Layout from "@/components/home/Layout"
import MovieList from "@/components/home/MovieList"
import type { Movie } from "@/components/home/movieListData"
import MovieSectionGroup from "@/components/home/MovieSectionGroup"
import NoticeModal from "@/components/home/NoticeModal"
import { getHomepageMovies } from "@/services/homepageAPI"
import { transformApiMovies } from "@/utils/movieTransform"

const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [carouselMovies, setCarouselMovies] = useState<Movie[]>([])
  const [topWeeklyMovies, setTopWeeklyMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [randomRecommendMovies, setRandomRecommendMovies] = useState<Movie[]>([])
  const [allMovies, setAllMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setShowModal(true)
  }, [])

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await getHomepageMovies()

        if (response.success && response.data) {
          setCarouselMovies(transformApiMovies(response.data.carousel))
          setTopWeeklyMovies(transformApiMovies(response.data.topWeekly))

          const upcoming = transformApiMovies(response.data.comingSoon)
          const sortedUpcoming = [...upcoming].sort((a, b) => {
            const daysA = a.daysUntilRelease ?? Infinity
            const daysB = b.daysUntilRelease ?? Infinity
            return daysA - daysB
          })
          setUpcomingMovies(sortedUpcoming)

          setRandomRecommendMovies(transformApiMovies(response.data.recommended))
          setAllMovies(transformApiMovies(response.data.allMovies))
        } else {
          setError(response.message || "取得資料失敗")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "發生未知錯誤")
        // eslint-disable-next-line no-console
        console.error("取得首頁資料失敗:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHomepageData()
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex h-screen flex-col items-center justify-center gap-6">
          <PuffLoader color="#11968D" size={80} />
          <p className="text-lg font-medium text-white">正在載入電影列表...</p>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex h-screen items-center justify-center">
          <p className="text-red-500">錯誤: {error}</p>
        </div>
      </Layout>
    )
  }

  return (
    <>
      <Layout carouselMovies={carouselMovies}>
        <MovieSectionGroup
          topWeekly={topWeeklyMovies}
          upcoming={upcomingMovies}
          randomRecommend={randomRecommendMovies}
        />
        <MovieList movies={allMovies} />
      </Layout>
      <NoticeModal isOpen={showModal} onClose={handleClose} />
    </>
  )
}

export default Home

import { useState, useEffect } from "react"
import { getHomepageMovies } from "@/api/homepage"
import Layout from "@/components/home/Layout"
import MovieList from "@/components/home/MovieList"
import type { Movie } from "@/components/home/movieListData"
import MovieSectionGroup from "@/components/home/MovieSectionGroup"
import NoticeModal from "@/components/home/NoticeModal"
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
          setUpcomingMovies(transformApiMovies(response.data.comingSoon))
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
        <div className="flex h-screen items-center justify-center">
          <p className="text-white">載入中...</p>
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

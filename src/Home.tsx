import { useState, useEffect } from "react"
import Layout from "@/components/home/Layout"
import MovieList from "@/components/home/MovieList"
import MovieSectionGroup from "@/components/home/MovieSectionGroup"
import NoticeModal from "@/components/home/NoticeModal"

const Home = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // 一進入首頁就顯示彈窗
    setShowModal(true)
  }, [])

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <>
      <Layout>
        <MovieSectionGroup />
        <MovieList />
      </Layout>
      <NoticeModal isOpen={showModal} onClose={handleClose} />
    </>
  )
}

export default Home

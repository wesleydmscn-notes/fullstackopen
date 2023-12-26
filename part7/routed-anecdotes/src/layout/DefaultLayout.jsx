import { useContext } from "react"
import { Outlet } from "react-router-dom"

import { Footer } from "../components/Footer"
import { Menu } from "../components/Menu"
import { AnecdoteContext } from "../contexts/Anecdotes"

export const DefaultLayout = () => {
  const { notification } = useContext(AnecdoteContext)

  return (
    <>
      <h1>Software anecdotes</h1>
      <p>{notification}</p>

      <Menu />
      <Outlet />
      <Footer />
    </>
  )
}

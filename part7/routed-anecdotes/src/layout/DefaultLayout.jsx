import { Outlet } from "react-router-dom"

import { Footer } from "../components/Footer"
import { Menu } from "../components/Menu"

export const DefaultLayout = () => {
  return (
    <>
      <h1>Software anecdotes</h1>

      <Menu />
      <Outlet />
      <Footer />
    </>
  )
}

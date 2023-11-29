import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog"

test("renders the blog's title and author", () => {
  const blog = {
    title: "Blog Test",
    author: "Wesley Damasceno",
    url: "https://wesleydmscn.co",
    likes: 50,
    user: {
      username: "wesleydmscn",
      name: "Wesley Damasceno",
      id: "6557fc68425d2a985b9bfc8c",
    },
    id: "6557fc69425d2a985b9bfc92",
  }

  render(<Blog blog={blog} user />)

  screen.getByText("Blog Test")
  screen.getByText("Wesley Damasceno")

  expect(screen.getByText("https://wesleydmscn.co")).toBeDefined()
  expect(screen.getByText("likes: 50")).toBeDefined()
})

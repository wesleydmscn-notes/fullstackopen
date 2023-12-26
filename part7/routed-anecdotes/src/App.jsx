import { BrowserRouter, Route, Routes } from "react-router-dom"

import { AnecdoteProvider } from "./contexts/Anecdotes"

import { CreateNew } from "./pages/CreateNew"
import { About } from "./pages/About"
import { AnecdoteView } from "./pages/AnecdoteView"

import { DefaultLayout } from "./layout/DefaultLayout"
import { AnecdoteList } from "./components/AnecdoteList"

const App = () => {
  return (
    <AnecdoteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/" element={<AnecdoteList />} />
            <Route path="/anecdotes/:id" element={<AnecdoteView />} />
            <Route path="/create" element={<CreateNew />} />
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AnecdoteProvider>
  )
}

export default App

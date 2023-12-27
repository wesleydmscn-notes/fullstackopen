import { useState } from "react"

export const useField = (type) => {
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [info, setInfo] = useState("")

  const onChangeContent = (event) => {
    setContent(event.target.value)
  }

  const onChangeAuthor = (event) => {
    setAuthor(event.target.value)
  }

  const onChangeInfo = (event) => {
    setInfo(event.target.value)
  }

  const resetAllFields = () => {
    setContent("")
    setAuthor("")
    setInfo("")
  }

  return {
    type,
    content,
    author,
    info,
    onChangeContent,
    onChangeAuthor,
    onChangeInfo,
    resetAllFields
  }
}
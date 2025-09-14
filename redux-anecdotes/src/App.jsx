import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import FilterForm from "./components/FilterForm"
import Notification from "./components/Notification"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Initializer } from "./reducers/anecdoteReducer"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Initializer())
  }, [])

  return (
   <>
   <Notification />
    <h2>Anecdotes</h2>
    <FilterForm />
    <AnecdoteList />
    <AnecdoteForm />
   </>
  )
}

export default App

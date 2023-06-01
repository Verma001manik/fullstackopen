import { createnote } from "../reducers/anecdoteReducer"
import { useSelector, useDispatch } from 'react-redux'
// const anecdotes = useSelector(state => state.anecdotes)

const AnecdoteForm = ()=>{
    const dispatch = useDispatch()
    const addNote=(event)=>{
        event.preventDefault()
        const content = event.target.create.value
        event.target.create.value = ''
        dispatch(createnote(content))
}
    

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNote}>
            <div>
                <input name='create'/>
            </div>
            <button>create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm
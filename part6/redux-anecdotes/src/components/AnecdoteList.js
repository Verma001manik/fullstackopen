import { useSelector, useDispatch } from 'react-redux'
import { increment} from '../reducers/anecdoteReducer'


const AnecdoteList = ()=>{
    const anecdotes = useSelector(state=>{
      if(state.filter ==='ALL'){
        return state.anecdotes

      }else {
        const filteredAnecdotes = state.anecdotes.filter(anecdote =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        );
        return filteredAnecdotes;
      }

    })
    const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(increment(id))
  }
    return (
        <div>
             {anecdotes
            .sort((a, b) => b.votes - a.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                  
                </div>
              </div>
            )}

        </div>
       
    )
}
export default AnecdoteList
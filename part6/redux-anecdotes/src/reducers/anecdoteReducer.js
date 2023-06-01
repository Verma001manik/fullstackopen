const anecdotesAtStart = {
  anecdotes: [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ],
  filter : 'ALL'
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.anecdotes.map(asObject)

export const increment = (id) => {
  return {
    type: 'INCREMENT',
    id: id
  }
}

const reducer = (state = initialState, action) => {
  
  console.log('action:', action)

  if (action.type === 'INCREMENT') {
    const id = action.id
    const anecdoteToVote = state.find(anecdote => anecdote.id === id)
    const votedAnecdote = {
      ...anecdoteToVote,
      votes: anecdoteToVote.votes + 1
    }
    return state.map(anecdote =>
      anecdote.id !== id ? anecdote : votedAnecdote
    )
  } 
  else if (action.type==='NEW_NOTE'){
    return [...state, action.payload]
  }

  return state
}
export const createnote = (content)=>{
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      id: getId(),
      votes : 0
  }
}
}
export default reducer
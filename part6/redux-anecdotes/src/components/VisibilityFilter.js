import { useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"
const VisibilityFilter = (props)=>{
    const dispatch = useDispatch()
    const handleChange = (event)=>{
        const filterValue = event.target.value;
        console.log(filterValue)
        dispatch(filterChange(filterValue))

    }
    const style ={
        marginBottom : 50
    }
    
    return (
        <div style={style}>
           filter :  <input name="filter" onChange={handleChange}    />
        </div>
    )
}
export default VisibilityFilter
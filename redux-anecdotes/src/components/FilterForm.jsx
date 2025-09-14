import { filter } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const FilterForm = () => {
    const dispatch = useDispatch()

    const handleFilter = (event) => {
        dispatch(filter(event.target.value))
    }
    const style = {
        marginBottom: 10
  }
    return (
        <>
            filter
            <input
                style={style}
                onChange={handleFilter}
            />
        </>

    )
}

export default FilterForm

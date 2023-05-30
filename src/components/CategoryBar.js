import { ListGroup } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'

const CategoryBar = observer(() => {
    const { catalog } = useContext(AppContext)
    const navigate = useNavigate()

    const handleClick = (id) => {
        if (id === catalog.category) {
            catalog.category = null
        } else {
            catalog.category = id
        }
    }

/*
    <ListGroup.Item
        key={item.id}
        active={item.id === catalog.category}
        onClick={() => handleClick(item.id)}
        style={{cursor: 'pointer'}}
    >
        {item.name}
    </ListGroup.Item>
*/

    return (
        catalog.categories.map(item =>
            <div key={item.id}><Link to={'/catalog/' + item.alias}>{item.name}</Link></div>                
        )
    )
})

export default CategoryBar
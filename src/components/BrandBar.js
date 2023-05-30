import { ListGroup } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'

const BrandBar = observer(() => {
    const { catalog } = useContext(AppContext)

    const handleClick = (id) => {
        if (id === catalog.brand) {
            catalog.brand = null
        } else {
            catalog.brand = id
        }
    }

    return (
        <ListGroup horizontal>
            {catalog.brands.map(item =>
                <ListGroup.Item
                    key={item.id}
                    active={item.id === catalog.brand}
                    onClick={() => handleClick(item.id)}
                    style={{cursor: 'pointer'}}
                >
                    {item.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    )
})

export default BrandBar
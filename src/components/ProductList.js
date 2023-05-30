import { Row, Pagination } from 'react-bootstrap'
import ProductItem from './ProductItem.js'
import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'

const ProductList = observer(() => {
    const { catalog } = useContext(AppContext)

    const handleClick = (page) => {
        catalog.page = page
    }

    const pages = []
    for (let page = 1; page <= catalog.pages; page++) {
        pages.push(
            <Pagination.Item
                key={page}
                active={page === catalog.page}
                activeLabel=""
                onClick={() => handleClick(page)}
            >
                {page}
            </Pagination.Item>
        )
    }

    return (
        <>
            
            {catalog.filter.map(item =>
                <div key={item.id}>
                    <strong>{item.id}</strong>
                </div>
            )}
            <Row className="mb-3">
                {catalog.products.length ? (
                    catalog.products.map(item =>
                        <ProductItem key={item.id} data={item} />
                    )
                ) : (
                    <p className="m-3">По вашему запросу ничего не найдено</p>
                )}
            </Row>
            {catalog.pages > 1 && <Pagination>{pages}</Pagination>}
        </>
    )
})

export default ProductList
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import SmartFilter from '../components/SmartFilter.js'
import Banners from '../components/Banners.js'
import BrandBar from '../components/BrandBar.js'
import ProductList from '../components/ProductList.js'
import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../components/AppContext.js'
import { fetchAllProperties, fetchCategories, fetchBrands, fetchAllProducts } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'

const Home = observer(() => {
    const { catalog } = useContext(AppContext)
    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [brandsFetching, setBrandsFetching] = useState(true)
    const [productsFetching, setProductsFetching] = useState(true)
    const [propertiesFetching, setPropertiesFetching] = useState(true)

    useEffect(() => {

        fetchAllProperties()
            .then(data => catalog.properties = data)
            .finally(() => setPropertiesFetching(false))

        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchBrands()
            .then(data => catalog.brands = data)
            .finally(() => setBrandsFetching(false))

        fetchAllProducts(null, null, null, 1, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [])

    useEffect(() => {
        setProductsFetching(true)
        fetchAllProducts(catalog.category, catalog.filter, catalog.brand, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [catalog.category, catalog.filter, catalog.brand, catalog.page])

    return (
        <section>
            <Container fluid><Banners/></Container>    
            <Container>            
                <Row className="mt-2">
                    <Col md={3} className="mb-3">
                        {categoriesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <div>
                                <CategoryBar />
                                
                            </div>
                        )}

                        {propertiesFetching ? (
                            <Spinner animation="border" />
                        ) : (
                            <div>
                                <SmartFilter />                                
                            </div>
                        )}
                    </Col>
                    <Col md={9}>
                        <div>
                            {brandsFetching ? (
                                <Spinner animation="border" />
                            ) : (
                                <BrandBar />
                            )}
                        </div>
                        <div>
                            {productsFetching ? (
                                <Spinner animation="border" />
                            ) : (
                                <ProductList />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>    
        
    )
})

export default Home
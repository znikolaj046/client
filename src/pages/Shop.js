import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryBar from '../components/CategoryBar.js'
import BrandBar from '../components/BrandBar.js'
import SmartFilter from '../components/SmartFilter.js'
import ProductList from '../components/ProductList.js'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../components/AppContext.js'
import { fetchProperties, fetchAllProperties, fetchCategory, fetchCategories, fetchBrands, fetchAllProducts } from '../http/catalogAPI.js'
import { observer } from 'mobx-react-lite'

const Shop = () => {    
    const { alias } =  useParams()
    const { catalog } = useContext(AppContext)
    const [category, setCategory] = useState(null)    
    const [categoryFetching, setCategoryFetching] = useState(true)
    const [categoriesFetching, setCategoriesFetching] = useState(true)
    const [brandsFetching, setBrandsFetching] = useState(true)
    const [productsFetching, setProductsFetching] = useState(true)
    const [propertiesFetching, setPropertiesFetching] = useState(true)

    useEffect(() => {

        fetchCategory(alias)
            .then(data => setCategory(data))            
            .finally(() => setCategoryFetching(false))


        fetchCategories()
            .then(data => catalog.categories = data)
            .finally(() => setCategoriesFetching(false))

        fetchBrands()
            .then(data => catalog.brands = data)
            .finally(() => setBrandsFetching(false))

        if(category !== null) {
            
            fetchProperties(category.id)
                .then(data => catalog.properties = data)
                .finally(() => setPropertiesFetching(false))


            fetchAllProducts(category.id, null, null, 1, catalog.limit)
                .then(data => {
                    catalog.products = data.rows
                    catalog.count = data.count
                })
                .finally(() => setProductsFetching(false))
        }    
    },[alias])

    useEffect(() => {
        
        fetchProperties(catalog.category)
            .then(data => catalog.properties = data)
            .finally(() => setPropertiesFetching(false))


        setProductsFetching(true)
        fetchAllProducts(catalog.category, catalog.filter, catalog.brand, catalog.page, catalog.limit)
            .then(data => {
                catalog.products = data.rows
                catalog.count = data.count
            })
            .finally(() => setProductsFetching(false))
    }, [catalog.category, catalog.filter, catalog.brand, catalog.page])

    
    if (!category) {
        return <Spinner animation="border" />
    } else {
        document.title = category.name
        catalog.category = category.id
    }

    return (                
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
    )
}

export default Shop
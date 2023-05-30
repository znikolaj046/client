import { Container, Row, Col, Button, Image, Spinner, Modal} from 'react-bootstrap'
import { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchOneProduct} from '../http/catalogAPI.js'
import { useParams } from 'react-router-dom'
import { append } from '../http/basketAPI.js'
import { AppContext } from '../components/AppContext.js'

const Product = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { basket } = useContext(AppContext)
    const [product, setProduct] = useState(null)
    const [isModalActive, setModalActive] = useState(false);

    useEffect(() => {
        fetchOneProduct(id).then(data => setProduct(data))
        
    }, [id])

    const handleClick = (productId, price) => {
        append(productId, price).then(data => {
            basket.products = data.products
            setModalActive(true);  
        })        
    }
    
    const handleModalClose = () => {
        setModalActive(false);
    };    

    if (!product) {
        return <Spinner animation="border" />
    } else {
        document.title = product.name
    }

    

    return (
        <Container>
            <Modal show={isModalActive} onHide={() => setModalActive(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Товар {product.name} добавлен в корзину</Modal.Title>
                </Modal.Header>
                <Modal.Body>                
                    {product.image ? (
                        <Image width={'100%'} height={'auto'} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={'100%'} height={'auto'} src="http://via.placeholder.com/300" />
                    )}
                    <div style={{marginTop:'15px', display:'flex', justifyContent:'space-between'}}>
                    <Button onClick={() => navigate(`/basket`)}>Перейти в корзину</Button>
                    <Button onClick={() => handleModalClose()}>Продолжить покупки</Button>
                    </div>
                </Modal.Body>
            </Modal>


            <Row className="mt-3 mb-3">
                <Col lg={4}>
                    {product.image ? (
                        <Image width={300} height={300} src={process.env.REACT_APP_IMG_URL + product.image} />
                    ) : (
                        <Image width={300} height={300} src="http://via.placeholder.com/300" />
                    )}
                </Col>
                <Col lg={8}>
                    <h1>{product.name}</h1>
                    {product.brand ? (
                        <p><strong>Бренд товара</strong>: {product.brand.name}</p>
                    ) : (
                        <span></span>
                    )}

                    {product.product_props_values ? (
                        <div className="mb-3">
                        <p><strong>Характеристики товара</strong></p>
                            <ul>
                                {product.product_props_values.map((value) =>(
                                    <li key={value.id}><strong>{value.product_prop.name} :</strong> {value.value}</li>
                                ))}                                
                            </ul>
                        </div>
                    ) : (
                        <span></span>
                    )}    

                    {product.hydroschemes ? (
                        <div className="mb-3">
                        <p><strong>Гидросхемы товара</strong></p>                            
                            {product.hydroschemes.map((value) =>(
                                <div key={value.id}>
                                    <div><strong>{value.title} :</strong> {value.description}</div>
                                    <Link width={300} to={process.env.REACT_APP_IMG_URL + value.link} >Скачать</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <span></span>
                    )}    

                    {product.materials ? (
                        <div>
                        <p><strong>Материалы по товару</strong></p>
                            <div>
                                {product.materials.map((value) =>(
                                    <div key={value.id}>
                                        <div><strong>{value.title} :</strong> {value.description}</div>
                                        <Link to={process.env.REACT_APP_IMG_URL + value.link}>Скачать</Link>
                                    </div>    
                                ))}                                
                            </div>
                        </div>
                    ) : (
                        <span></span>
                    )}    
                    <h3>{product.price}.00 руб.</h3>
                    <Button onClick={() => handleClick(product.id, product.price)}>Добавить в корзину</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default Product
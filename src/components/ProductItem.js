import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const ProductItem = ({data}) => {
    const navigate = useNavigate()
    return (
        <Col xl={3} lg={4} sm={6} className="mt-3" onClick={() => navigate(`/product/${data.id}`)}>
            <Card style={{cursor: 'pointer'}}>
                {data.image ? (
                    <Card.Img variant="top" src={process.env.REACT_APP_IMG_URL + data.image} />
                ) : (
                    <Card.Img variant="top" src="http://via.placeholder.com/200" />
                )}
                <Card.Body style={{overflow: 'hidden'}}>                    
                    <strong>{data.name}</strong><br/>
                    <strong>Цена: {data.price}</strong>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default ProductItem
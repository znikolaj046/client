import { Container, Button, Row, Col, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { fetchPage } from '../http/catalogAPI.js'

const Pages = () => {
    const { alias } = useParams()
    const [page, setPage] = useState(null)
    const [fetching, setFetching] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetchPage(alias)
            .then(
                data => setPage(data)
            )
            .catch(
                error => setError(error.response.data.message)
            )
            .finally(
                () => setFetching(false)
            )
    }, [alias])

    if (fetching) {
        return <Spinner animation="border" />
    } else {
        document.title = page.title
    }

    if (error) {
        return <p>{error}</p>
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{page.title}</h1>
                </Col>    
            </Row>    
           <Row>
                <Col>
                    {page.text}
                </Col>
            </Row> 
        </Container>
    )

}

export default Pages
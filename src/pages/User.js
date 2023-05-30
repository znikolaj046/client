import { Container, Button } from 'react-bootstrap'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext.js'
import { useNavigate } from 'react-router-dom'
import { logout } from '../http/userAPI.js'

const User = () => {
    const { user } = useContext(AppContext)
    const navigate = useNavigate()

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/login', {replace: true})
    }

    return (
        <Container>
            <h1>Личный кабинет</h1>
            <p>
                Это личный кабинет постоянного покупателя магазина
            </p>
            <Button onClick={handleLogout}>Выйти</Button>
        </Container>
    )
}

export default User
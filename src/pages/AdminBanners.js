import { useState, useEffect } from 'react'
import { fetchBanners, deleteBanner } from '../http/catalogAPI.js'
import { Button, Container, Spinner, Table } from 'react-bootstrap'
import EditBanner from '../components/EditBanner.js'

const AdminBanners = () => {
    const [Banners, setBanners] = useState(null) // список загруженных брендов
    const [fetching, setFetching] = useState(true) // загрузка списка брендов с сервера
    const [show, setShow] = useState(false) // модальное окно создания-редактирования
    // для обновления списка после добавления, редактирования, удаления — изменяем состояние
    const [change, setChange] = useState(false)
    // id бренда, который будем редактировать — для передачи в <EditBanner id={…} />
    const [BannerId, setBannerId] = useState(0)

    const handleCreateClick = () => {
        setBannerId(0)
        setShow(true)
    }

    const handleUpdateClick = (id) => {
        setBannerId(id)
        setShow(true)
    }

    const handleDeleteClick = (id) => {
        deleteBanner(id)
            .then(
                data => {
                    setChange(!change)
                    alert(`Баннер «${data.name}» удален`)
                }
            )
            .catch(
                error => alert(error.response.data.message)
            )
    }

    useEffect(() => {
        fetchBanners()
            .then(
                data => setBanners(data)
            )
            .finally(
                () => setFetching(false)
            )
    }, [change])

    if (fetching) {
        return <Spinner animation="border" />
    }

    return (
        <Container>
            <h1>Баннеры</h1>
            <Button onClick={() => handleCreateClick()}>Создать баннер</Button>
            <EditBanner id={BannerId} show={show} setShow={setShow} setChange={setChange} />
            {Banners.length > 0 ? (
                <Table bordered hover size="sm" className="mt-3">
                <thead>
                    <tr>
                        <th>Изображение</th>
                        <th>Статус</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {Banners.map(item => 
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                                    Редактировать
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                                    Удалить
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
                </Table>
            ) : (
                <p>Список брендов пустой</p>
            )}
        </Container>
    )
}

export default AdminBanners
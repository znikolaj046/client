import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import { createBanner, fetchBanner, updateBanner } from '../http/catalogAPI.js'
import { useState, useEffect } from 'react'

const defaultValue = {name: '', description: '', status: 0, image: ''}
const defaultValid = {name: null, description: null, status: null, image: null}


const isValid = (value) => {
    const result = {}
    const pattern = /^[1-9][0-9]*$/
    for (let key in value) {
        if (key === 'name') result.name = value.name.trim() !== ''
    }
    return result
}

const EditBanner = (props) => {
    const { id, show, setShow, setChange } = props

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState(defaultValue)
    const [valid, setValid] = useState(defaultValid)
    // список категорий и список брендов для возможности выбора

    // выбранное для загрузки изображение товара
    const [image, setImage] = useState(null)

    useEffect(() => {
        if(id) {
            fetchBanner(id)
                .then(
                    data => {
                        setDescription(data.description)
                        setValid(data.description !== '')
                        setName(data.name)
                        setValid(data.name !== '')
                        setImage(data.image)
                        setValid(data.image !== '')
                    }
                )
                .catch(
                    error => alert(error.response.data.message)
                )
        } else {
            setName('')
            setValid(null)
        }
    }, [id])


    const handleInputChange = (event) => {
        const data = {...value, [event.target.name]: event.target.value}
        setValue(data)
        setValid(isValid(data))
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0])
    }

    const handleChange = (event) => {
        setName(event.target.value)
        setValid(event.target.value.trim() !== '')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        /*
         * На первый взгляд кажется, что переменная correct не нужна, можно обойтись valid, но это
         * не так. Нельзя использовать значение valid сразу после изменения этого значения — ф-ция
         * setValid не изменяет значение состояния мгновенно. Вызов функции лишь означает — React
         * «принял к сведению» наше сообщение, что состояние нужно изменить.
         */
        const correct = name.trim() !== '' && image.name !== ''
        setValid(correct)
        
        // если введенные данные прошли проверку — можно отправлять их на сервер
        if (correct) {

            const data = new FormData()
            data.append('name', name.trim())
            data.append('description', description.trim())
            data.append('status', value.status)

            if (image) data.append('image', image, image.name)

            const success = (data) => {
                // закрываем модальное окно создания-редактирования баннера
                setShow(false)
                // изменяем состояние родителя, чтобы обновить список баннера
                setChange(state => !state)
            }
            const error = (error) => {
                alert(error.response.data.message)
            }    

            id > 0 ? updateBanner(id, data).then(success).catch(error) : createBanner(data).then(success).catch(error)

        }
    }

    return (
        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{id ? 'Редактирование' : 'Создание'} баннера</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={handleSubmit}>
                    
                <Row className="mb-3">
                        <Col>
                        
                        <Form.Control
                            name="name"
                            value={name}
                            onChange={e => handleChange(e)}
                            isValid={valid === true}
                            isInvalid={valid === false}
                            placeholder="Название баннера..."
                        />


                        </Col>
                </Row>        
                <Row className="mb-3">
                        <Col>
                        
                        <Form.Control
                            name="description"
                            value={description}
                            onChange={e => handleChange(e)}
                            isValid={valid === true}
                            isInvalid={valid === false}
                            placeholder="Описание баннера..."
                        />


                        </Col>
                </Row>        
                <Row className="mb-3">
                        <Col>
                            <Form.Select
                                name="status"
                                value={value.status}
                                onChange={e => handleInputChange(e)}
                                
                            >
                                <option value="0">Не публиковать</option>
                                <option value="1">Публиковать</option>                                
                            </Form.Select>
                        </Col>
                        </Row>        

                {id ? <Row className="mb-3"><Col><Image width={'100%'} src={process.env.REACT_APP_IMG_URL + image} /></Col></Row> : ''}

                <Row className="mb-3">
                        <Col>
                            <Form.Control
                                name="image"
                                type="file"
                                onChange={e => handleImageChange(e)}
                                placeholder="Картинка баннера..."
                            />
                        </Col>
                </Row>                            
                    <Button type="submit">Сохранить</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default EditBanner
import { guestInstance, authInstance } from './index.js'

export const fetchAllProperties = async () => {
    const { data } = await authInstance.get(`/category/property/getvalues`)
    return data
}

export const fetchProperties = async (id) => {
    console.log(`/category/${id}/property/getvalues/`)
    const { data } = await authInstance.get(`/category/${id}/property/getvalues/`)
    return data
}

/*
 * Создание, обновление и удаление категории, получение списка всех категорий
 */
export const createCategory = async (category) => {
    const { data } = await authInstance.post('category/create', category)
    return data
}

export const updateCategory = async (id, category) => {
    const { data } = await authInstance.put(`category/update/${id}`, category)
    return data
}

export const deleteCategory = async (id) => {
    const { data } = await authInstance.delete(`category/delete/${id}`)
    return data
}

export const fetchCategories = async () => {
    const { data } = await guestInstance.get('category/getall')
    return data
}

export const fetchCategory = async (alias) => {    
    const { data } = await guestInstance.get(`category/getone/${alias}`)
    return data
}

export const fetchPage = async (alias) => {    
    const { data } = await guestInstance.get(`pages/getone/${alias}`)
    return data
}


/*
 * Создание, обновление и удаление бренда, получение списка всех брендов
 */
export const createBrand = async (brand) => {
    const { data } = await authInstance.post('brand/create', brand)
    return data
}

export const updateBrand = async (id, brand) => {
    const { data } = await authInstance.put(`brand/update/${id}`, brand)
    return data
}

export const deleteBrand = async (id) => {
    const { data } = await authInstance.delete(`brand/delete/${id}`)
    return data
}

export const fetchBrands = async () => {
    const { data } = await guestInstance.get('brand/getall')
    return data
}

export const fetchBrand = async (id) => {
    const { data } = await guestInstance.get(`brand/getone/${id}`)
    return data
}


/*
 * Создание, обновление и удаление баннеров, получение списка всех баннеров
 */
export const createBanner = async (banner) => {
    const { data } = await authInstance.post('banner/create', banner)
    return data
}

export const updateBanner = async (id, banner) => {
    const { data } = await authInstance.put(`banner/update/${id}`, banner)
    return data
}

export const deleteBanner = async (id) => {
    const { data } = await authInstance.delete(`banner/delete/${id}`)
    return data
}

export const fetchBanners = async () => {
    const { data } = await guestInstance.get('banner/getall')
    return data
}

export const fetchBanner = async (id) => {
    const { data } = await guestInstance.get(`banner/getone/${id}`)
    return data
}

/*
 * Создание, обновление и удаление товара, получение списка всех товаров
 */
export const createProduct = async (product) => {
    const { data } = await authInstance.post('product/create', product)
    return data
}

export const updateProduct = async (id, product) => {
    const { data } = await authInstance.put(`product/update/${id}`, product)
    return data
}

export const deleteProduct = async (id) => {
    const { data } = await authInstance.delete(`product/delete/${id}`)
    return data
}

export const fetchAllProducts = async (categoryId = null, filter = null, brandId = null, page = 1, limit = 3) => {
    let url = 'product/getall'
    // фильтрация товаров по категории и/или бренду
    if (categoryId) url = url + '/categoryId/' + categoryId
    if (brandId) url = url + '/brandId/' + brandId

    if (filter) {
        let filter_array = [];
        let filter_string = '';

        filter.map((item) => {
            filter_array.push(item);
        })

        filter_string = filter_array.join('-or-');

        if (filter_string !== '')  url = url + '/filter/' + filter_string
        console.log(url)
    }
    
    const { data } = await guestInstance.get(
        url,
        {params: { // GET-параметры для постраничной навигации
            page, limit
        }
    })
    return data
}

export const fetchOneProduct = async (id) => {
    const { data } = await guestInstance.get(`product/getone/${id}`)
    return data
}

export const fetchProdRating = async (id) => {
    const { data } = await guestInstance.get(`rating/product/${id}`)
    return data
}

/*
 * Создание, обновление и удаление характеристик товара
 */
export const createProperty = async (productId, property) => {
    const { data } = await authInstance.post(`product/${productId}/property/create`, property)
    return data
}

export const updateProperty = async (productId, id, property) => {
    const { data } = await authInstance.put(`product/${productId}/property/update/${id}`, property)
    return data
}

export const deleteProperty = async (productId, id) => {
    const { data } = await authInstance.delete(`product/${productId}/property/delete/${id}`)
    return data
}
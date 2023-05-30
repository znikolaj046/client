import { makeAutoObservable } from 'mobx'

class CatalogStore {
    _categories = []
    _brands = []
    _banners = []
    _products = []
    _properties = []
    _filter = []
    _category = null // выбранная категория
    _brand = null // выбранный бренд
    _page = 1 // текущая страница
    _count = 0 // сколько всего товаров
    _limit = 3 // товаров на страницу

    constructor() {
        makeAutoObservable(this)
    }

    get properties() {
        return this._properties
    }

    get filter() {
        console.log(this._filter)
        return this._filter
    }

    get categories() {
        return this._categories
    }

    get brands() {
        return this._brands
    }

    get banners() {
        return this._banners
    }

    get products() {
        return this._products
    }

    get category() {
        return this._category
    }

    get brand() {
        return this._brand
    }

    get page() {
        return this._page
    }

    get count() {
        return this._count
    }

    get limit() {
        return this._limit
    }

    get pages() { // всего страниц
        return Math.ceil(this.count / this.limit)
    }

    set filter(filter) {
        this._filter = filter
    }

    filterAdd(filter) {
        this._filter.push(filter)
    }

    filterRemove(filter) {

        this._filter= this._filter.filter(function(f) { return f.id !== filter.id })
    }

    set properties(properties) {
        this._properties = properties
    }

    set categories(categories) {
        //console.log(categories)
        this._categories = categories
    }

    set brands(brands) {
        this._brands = brands
    }

    set banners(banners) {
        this._banners = banners
    }


    set products(products) {
        this._products = products
    }

    set category(id) {
        this.page = 1
        this._category = id
    }

    set brand(id) {
        this.page = 1
        this._brand = id
    }

    set page(page) {
        this._page = page
    }

    set count(count) {
        this._count = count
    }

    set limit(limit) {
        this._limit = limit
    }
}

export default CatalogStore
const URL = `http://shoppinglist.tuurwf/api/shopping-list/`
const UPDATE_URL = `http://shoppinglist.tuurwf/api/shopping-list/`
const DEFAULT_LANGUAGE = "nl"

export default class ShopListService {
    constructor()
    {
        this.language = DEFAULT_LANGUAGE
        this.page = 1
        this.perPage = 6
        this.totalPages = 0
    }

    setPage(page)
    {
        this.page = page
        return this
    }

    setPerPage(perPage)
    {
        this.perPage = perPage
        return this
    }

    setLanguage(lang)
    {
        this.language = lang
        return this
    }

    async list()
    {
        let fullUrl = URL;
        fullUrl += `list?language=${this.language}`
        fullUrl += `&perpage=${this.perPage}`
        fullUrl += `&page=${this.page}`

        console.log(fullUrl)

        const response = await fetch(fullUrl)
        const data = response.json()

        return data;
    }

    async all()
    {
        let fullUrl = URL;
        const response = await fetch(fullUrl)
        const data = response.json()

        return data;
    }
    
    async update(item)
    {
        try {
            const response = await fetch(`${UPDATE_URL}${item.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify({
                    quantity: item.quantity
                }),
            });

            const responseData = await response.json()
      
            return responseData;

        } catch (error) {
            console.error(error)
        }
    }

    async remove(itemId)
    {
        try {
            const response = await fetch(`http://shoppinglist.tuurwf/api/shopping-list/${itemId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                }
            });

            const responseData = await response.json()
      
            return responseData;

        } catch (error) {
            console.error(error)
        }
    }

    async addItem(product) 
    {
        try {

            
            const response = await fetch(`http://shoppinglist.tuurwf/api/shopping-list`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token"),
                },
                body: JSON.stringify(
                    product
                ),
            });

            const responseData = await response.json()
      
            return responseData;

        } catch (error)  {
            console.error(error)
        }
    }
    
}
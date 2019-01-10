const ITEMS_API = "http://localhost:3000/api/v1/items";

export default class Adapter {
    static getItems() {
        return fetch(`${ITEMS_API}`)
            .then(res => res.json())
            .then(json => json.url)
    }

}
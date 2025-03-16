import type { RequestHandler } from './$types';
import { API_ADDRESS } from "$env/static/private";


export const GET: RequestHandler = ({ url }) => {
	let total;
    let per_page;
    let items;
    let items_on_page;

    fetch(`https://${API_ADDRESS}/wishlist?page=${url.searchParams.get('page')}`)
        .then((response) => {
            return response.json();
        })
        .then(function (response) {
            total = response.total;
            per_page = response.per_page;
            items = response.data;
            let _items_on_page = 0; 
            for (const category in items) {
                for (const subcategory in items[category]) {
                    _items_on_page += items[category][subcategory].length;
                }
            }
            items_on_page = _items_on_page;
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
        });
    return new Response(String({
            items: items,
            items_on_page: items_on_page,
            total: total,
            per_page: per_page,
        })
    );
};
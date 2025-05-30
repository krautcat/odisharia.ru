import type { PageLoad } from "./$types";


export const load: PageLoad = async ({ fetch, params }) => {
	return await fetch(`api.odisharia.ru:18443/wishlist?page=${params.page}`)
        .then((response: Response) => {
            return response.json();
        })

};
export const useFavourite = () => useState('favouriteItem', () => <any>[])

export const useAddToFavourites = () => (university: any) => {
	const favouriteItems = useFavourite()

	favouriteItems.value.push({
		id: university.id,
		country: university.country,
		code: university.code,
		name: university.name,
		stateProvince: university.stateProvince,
		webPages: university.webPages,
		favourite: true
	})
	
	localStorage.setItem('favourites', JSON.stringify(favouriteItems.value))
}

export const useRemoveFromFavourites = () => (university: any) => {
	const favouriteItems = useFavourite()

	const index = favouriteItems.value.findIndex((item:any) => item.name === university.name)
	if (index !== -1) {
		favouriteItems.value.splice(index, 1)
		localStorage.setItem('favourites', JSON.stringify(favouriteItems.value))
	}
}

export const getFavorites = () => {
	const favouriteItems = useFavourite()

	const saved = localStorage.getItem('favourites')
	const parsedFavorites = saved ? JSON.parse(saved) : []
	favouriteItems.value = parsedFavorites
}
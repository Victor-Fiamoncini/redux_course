import React, { useEffect, useState } from 'react'
import { mainApi } from '../../services/apiClients'

import CatalogItem from '../CatalogItem'

import { IProduct } from '../../store/modules/cart/types'

const Catalog: React.FC = () => {
	const [catalog, setCatalog] = useState<IProduct[]>([])

	useEffect(() => {
		mainApi.get('/products').then(response => {
			setCatalog(response.data)
		})
	}, [])

	return (
		<main>
			<h1>Catalog</h1>
			{catalog.map(product => (
				<CatalogItem key={product.id} product={product} />
			))}
		</main>
	)
}

export default Catalog

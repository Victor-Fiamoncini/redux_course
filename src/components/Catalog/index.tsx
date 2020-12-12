import React, { useCallback, useEffect, useState } from 'react'
import { mainApi } from '../../services/apiClients'

import { IProduct } from '../../store/modules/cart/types'

const Catalog: React.FC = () => {
	const [catalog, setCatalog] = useState<IProduct[]>([])

	useEffect(() => {
		mainApi.get('/products').then(response => {
			setCatalog(response.data)
		})
	}, [])

	const handleAddProductToCart = useCallback(() => {}, [])

	return (
		<main>
			<h1>Catalog</h1>
			{catalog.map(product => (
				<article key={product.id}>
					<strong>{product.title}</strong> {' - '}
					<span>{product.price}</span>
					<button type="button"></button>
				</article>
			))}
		</main>
	)
}

export default Catalog

import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { IState } from '../..'
import { mainApi } from '../../../services/apiClients'

import {
	addProductToCartFailure,
	addProductToCartRequest,
	addProductToCartSuccess,
} from './actions'

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

function* checkProductStock({ payload }: CheckProductStockRequest) {
	const { product } = payload

	const currentQuantity = yield select((state: IState) => {
		return (
			state.cart.items.find(item => item.product.id === product.id)?.quantity ??
			0
		)
	})

	const availableStockResponse = yield call(mainApi.get, `stock/${product.id}`)

	if (availableStockResponse.data.quantity > currentQuantity) {
		yield put(addProductToCartSuccess(product))
	} else {
		yield put(addProductToCartFailure(product.id))
	}
}

export default all([
	takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock),
])

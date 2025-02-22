import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

/* eslint-disable no-useless-catch */
const createNew = async (reqBody) => {
  try {
    const newCard = { ...reqBody }

    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.fineOneById(createdCard?.insertedId)

    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) { throw error }
}

const update = async (cardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedCard = await cardModel.update(cardId, updateData)

    return updatedCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew,
  update
}

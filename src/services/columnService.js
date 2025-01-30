import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'

/* eslint-disable no-useless-catch */
const createNew = async (reqBody) => {
  try {
    const newColumn = { ...reqBody }

    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.fineOneById(createdColumn?.insertedId)

    if (getNewColumn) {
      getNewColumn.cards = []

      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

export const columnService = {
  createNew
}

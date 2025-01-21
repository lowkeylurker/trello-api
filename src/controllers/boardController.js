import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res) => {
  try {
    console.log(req.body)
    
    res.status(StatusCodes.CREATED).json({
      message: 'POST: API CREATED new list boards'
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}

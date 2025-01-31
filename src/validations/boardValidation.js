import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (levion)',
      'string.empty': 'Title is not allowed to be empty (levion)',
      'string.min': 'Title length must be at least 3 characters long (levion)',
      'string.max': 'Title length must be less than or equal to 5 characters long (levion)',
      'string.trim': 'Title must not have leading or trailing whitespace (levion)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(...Object.values(BOARD_TYPES)).required()
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) { next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)) }
}

const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict(),
    description: Joi.string().min(3).max(256).trim().strict(),
    type: Joi.string().valid(...Object.values(BOARD_TYPES))
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) { next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)) }
}

export const boardValidation = {
  createNew,
  update
}
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'
import { JwtProvider } from '~/providers/JwtProvider'
import ApiError from '~/utils/ApiError'

// Middleware này sẽ đảm nhận việc quan trọng: Xác thực JWT accessToken nhận được từ phía FE có hợp lệ không
const isAuthorized = async (req, res, next) => {
  // Lấy accessToken trong request cookies phía FE
  const clientAccessToken = req.cookies?.accessToken

  // Nếu clientAccessToken không tồn tại thì trả về lỗi
  if (!clientAccessToken) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! (Token not found)'))
    return
  }

  try {
    // Bước 1: Thực hiện giải mã token xem nó có hợp lệ hay không
    const accessTokenDecoded = await JwtProvider.verifyToken(
      clientAccessToken,
      env.ACCESS_TOKEN_SECRET_SIGNATURE
    )

    // Bước 2: Nếu token hợp lệ, cần phải lưu thông tin giải mã được vào req.jwtDecoded đế sử dụng cho các tầng cần xử lý ở phía sau
    req.jwtDecoded = accessTokenDecoded

    // Bước 3: Cho phép request đi tiếp
    next()
  } catch (error) {
    // Nếu accessToken hết hạn (expired) => trả về mã GONE - 410 cho phía FE biết để gọi API refreshToken
    if (error?.message?.includes('jwt expired')) {
      next(new ApiError(StatusCodes.GONE, 'Need to refresh token.'))
      return
    }

    // Nếu accessToken không hợp lệ hoặc bất kì lỗi gì khác việc hết hạn => trả về mã 401 cho phía FE xử lý Logout hoặc gọi API Logout tùy trường hợp
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized! Please Login.'))
  }
}

export const authMiddleware = { isAuthorized }
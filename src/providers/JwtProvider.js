import JWT from 'jsonwebtoken'

/**
 * Function tạo mới một Token - Cần 3 tham số đầu vào
 * @param userInfo Những thông tin muốn đính kèm vào token
 * @param secretSignature Chữ ký bí mật (dạng một string ngẫu nhiên)
 * @param tokenLife Thời gian sống của token
 */
const generateToken = async (userInfo, secretSignature, tokenLife) => {
  try {
    return JWT.sign(userInfo, secretSignature, { algorithm: 'HS256', expiresIn: tokenLife })
  } catch (error) { throw new Error(error) }
}

/**
 * Function kiểm tra một token có hợp lệ hay không
 * Hợp lệ = token có đúng với secretSignature trong project hay không
 */
const verifyToken = async (token,secretSignature) => {
  try {
    return JWT.verify(token, secretSignature)
  } catch (error) { throw new Error(error) }
}

export const JwtProvider = {
  generateToken,
  verifyToken
}

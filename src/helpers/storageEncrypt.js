import { EncryptStorage } from '@storage-encryption/storage-encryption'

export default new EncryptStorage(
  process.env.REACT_APP_SECRET_KEY,
  'localStorage'
)

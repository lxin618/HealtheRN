import * as Keychain from 'react-native-keychain'

interface Options {
  service?: string
}

export const authKeychainService = 'healthe-app-auth'

export async function getGenericPassword(
  options?: Options
): Promise<string | null> {
  const credentials = await Keychain.getGenericPassword({
    service: options?.service,
  })
  if (credentials) {
    return credentials.password
  } else {
    return null
  }
}

export async function getUserName(options?: Options) {
  const credentials = await Keychain.getGenericPassword({
    service: options?.service,
  })
  return credentials ? credentials.username : null
}

export async function setGenericPassword(
  username: string,
  password: string,
  options?: Options
): Promise<void> {
  await Keychain.setGenericPassword(username, password, {
    accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
    service: options?.service,
  })
}

export async function resetGenericPassword(options?: Options): Promise<void> {
  return Keychain.resetGenericPassword({ service: options?.service }).then(
    () => {
      return
    }
  )
}

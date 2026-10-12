export function formatLangCode(code) {
  if (!code) return ''

  try {
    const languageNames = new Intl.DisplayNames([code], { type: 'language' })

    const formattedName = languageNames.of(code)

    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1)
  } catch (error) {
    console.log('Error at format lang code:', error)
    return code
  }
}

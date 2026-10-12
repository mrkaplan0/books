export function textShortener(htmlString) {
  if (!htmlString) return ''

  // 1. HTML string'ini güvenli bir şekilde düz metne dönüştürün
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlString, 'text/html')
  const plainText = doc.body.textContent || ''

  // 2. İlk noktaya göre metni bölün ve ilk cümleyi alın
  const firstSentence = plainText.split('.')[0]

  return firstSentence ? firstSentence.trim() + '.' : ''
}

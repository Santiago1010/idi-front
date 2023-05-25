import { i18n } from './i18n.js'

const { t: translate } = i18n.global

export const templateRecoverToken = (token) => {
  const subject = `[MID] ${translate('info.templates.recoverToken.subject')}`

  let bodyTemplate = translate('info.templates.recoverToken.body');
  const body = bodyTemplate.replace('%token%', token);

  const mailto = `mailto:support@idi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  return mailto
}

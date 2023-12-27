import { createI18n } from 'vue-i18n'
import en from './en.json'
import kr from './kr.json'
import zhHant from './zhHant.json'
import ru from './ru.json'
import pt from './pt.json'
import ja from './ja.json'
import it from './it.json'
import fr from './fr.json'
import de from './de.json'

const messages = {
    en,
    kr,
    zhHant,
    ru,
    pt,
    ja,
    it,
    fr,
    de,
}

const i18nConfig = {
    legacy: false, // you must set `false`, to use Compostion API
    locale: uni.getStorageSync('lang') ?? 'en', // 获取已设置的语言
    messages,
}// v9.x

const i18n = createI18n(i18nConfig)

export default i18n

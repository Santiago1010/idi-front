import { useRulesStore } from './RulesStore.js'
import { useRegexStore } from './RegexStore.js'

const rules = {
  rulesStore: useRulesStore(),
  regexStore: useRegexStore(),
}

module.exports = rules;

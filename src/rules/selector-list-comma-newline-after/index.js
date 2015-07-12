import {
  ruleMessages,
  styleSearch,
  report,
  whitespaceChecker
} from "../../utils"

export const ruleName = "selector-list-comma-newline-after"

export const messages = ruleMessages(ruleName, {
  expectedAfter: () => `Expected newline after ","`,
  expectedAfterMultiLine: () => `Expected newline after "," in a multi-line list`,
  rejectedAfterMultiLine: () => `Unexpected whitespace after "," in a multi-line list`,
})

/**
 * @param {"always"|"always-multi-line"|"never-multi-line"} expectation
 */
export default function (expectation) {
  const checker = whitespaceChecker("newline", expectation, messages)
  return (root, result) => {
    root.eachRule(rule => {
      // Allow for the special case of nested rule sets
      // that should be indented
      const checkLocation = (rule.parent === root)
        ? checker.after
        : checker.afterOneOnly

      const selector = rule.selector
      styleSearch({ source: selector, target: "," }, match => {
        checkLocation({
          source: selector,
          index: match.startIndex,
          err: m =>
            report({
              message: m,
              node: rule,
              result,
              ruleName,
            }),
        })
      })
    })
  }
}
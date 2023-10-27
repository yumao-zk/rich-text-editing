import measureNormalLineHeight from './measureLineHeight'

import { configs } from '../config'
const DEFAULT_STYLE = configs.defaultStyle


export const SPAN_ATTRS = [
  'fontFamily',
  'fontWeight',
  'fontSize',
  'color',
  'fontStyle',
  'textDecoration',
  'letterSpacing',
  'lineHeight'
]

const getParaAttr = (paras, delegatePIndex = [ 0 ], attr) => {
  if (attr === 'paraSpacing') return paras[delegatePIndex[0]].paraSpacing
}

export const getSingleSpanAttr = (s, attr) => {
  if (attr === 'fontFamily') return s.fontFamily || DEFAULT_STYLE.fontFamily
  if (attr === 'fontWeight') return s.fontWeight || DEFAULT_STYLE.fontWeight
  if (attr === 'boldType') return Number(s.boldType) ? 1 : 0
  if (attr === 'fontSize') return s.fontSize || DEFAULT_STYLE.fontSize
  if (attr === 'color') return s.color || DEFAULT_STYLE.color
  if (attr === 'fontStyle') return s.fontStyle || DEFAULT_STYLE.fontStyle
  if (attr === 'textDecoration') return s.textDecoration || DEFAULT_STYLE.textDecoration
  if (attr === 'letterSpacing') return s.letterSpacing || DEFAULT_STYLE.letterSpacing
  if (attr === 'lineHeight') {
    const spanLineHeight = s.lineHeight
    return (
      (!spanLineHeight || spanLineHeight === 'normal')
      ?
      Math.ceil(measureNormalLineHeight(
        getSingleSpanAttr(s, 'fontFamily'),
        getSingleSpanAttr(s, 'fontSize')
      ))
      :
      spanLineHeight
    )
  }
}

const getSpanAttr = (paras, delegateSpanIndex = [ 0, 0 ], attr) => {
  const delegatePi = delegateSpanIndex[0]
  const delegateSi = delegateSpanIndex[1]
  const delegateSpan = paras[delegatePi].children[delegateSi]

  return getSingleSpanAttr(delegateSpan, attr)
}

export const getRichTextAttr = (paras, selectionStartIndex, attr) => {
  if (!paras) return null

  const attrs = {
    fontFamily: getSpanAttr(paras, selectionStartIndex, 'fontFamily'),
    fontWeight: getSpanAttr(paras, selectionStartIndex, 'fontWeight'),
    boldType: getSpanAttr(paras, selectionStartIndex, 'boldType'),
    fontSize: getSpanAttr(paras, selectionStartIndex, 'fontSize'),
    color: getSpanAttr(paras, selectionStartIndex, 'color'),
    fontStyle: getSpanAttr(paras, selectionStartIndex, 'fontStyle'),
    textDecoration: getSpanAttr(paras, selectionStartIndex, 'textDecoration'),
    letterSpacing: getSpanAttr(paras, selectionStartIndex, 'letterSpacing'),
    lineHeight: getSpanAttr(paras, selectionStartIndex, 'lineHeight'),

    paraSpacing: getParaAttr(paras, selectionStartIndex, 'paraSpacing')
  }

  return attr ? attrs[attr] : attrs
}

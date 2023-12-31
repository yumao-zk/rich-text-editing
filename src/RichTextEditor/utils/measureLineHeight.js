export default function measureNormalLineHeight(fontFamily, fontSize) {
    var targetNodeId = "NORMAL_LINE_HEIGHT_MEASURE_NODE"
  
    var targetNode = document.getElementById(targetNodeId)
    if (!targetNode) {
      targetNode = document.createElement('div')
      targetNode.id = targetNodeId
      document.body.appendChild(targetNode)
    }
  
    targetNode.style.whiteSpace = 'pre'
    targetNode.style.lineHeight = 'normal'
    if (fontFamily) targetNode.style.fontFamily = fontFamily
    if (fontSize) targetNode.style.fontSize = fontSize + 'px'
  
    targetNode.innerHTML = ' '
    var targetRect = targetNode.getBoundingClientRect()
  
    return targetRect.height
  }
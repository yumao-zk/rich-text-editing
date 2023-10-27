import React, { Component } from 'react'

import Editor, { editorBridge, getRichTextAttr } from './RichTextEditor'
import { Select, ColorPicker, InputNumber  } from 'antd';

const INITIAL_TEXT = 'Type, type like a typewriter'
const INITIAL_EDITOR_STORE = {
  paras: [{
    paraSpacing: 15,
    children: [{
      text: INITIAL_TEXT,
      fontSize: 24,
      fontFamily: 'Trebuchet MS',
      color: '#ddc848'
    }]
  }]
}

export default class App extends Component {
  state = {
    editorStore: INITIAL_EDITOR_STORE
  }

  handleSelectionChange = editorStore => this.setState({ editorStore })

  getAttrs = ({ paras, selection }) => {
    const selectionStartIndex = selection ? selection.start : undefined
    return getRichTextAttr(paras, selectionStartIndex)
  }

  handleFontFamilyChange = val => this.handleChange('fontFamily', val)
  handleFontWeightChange = val => this.handleChange('fontWeight', val)
  handleFontSizeChange = val => this.handleChange('fontSize', val)
  handleColorChange = val => { 
    this.handleChange('color', val.toHexString())
  }
  handleLetterSpacingChange = val => this.handleChange('letterSpacing', val)
  handleLineHeightChange = val => this.handleChange('lineHeight', val)
  handleParaSpacingChange = val => this.handleChange('paraSpacing', val)

  handleBold = () => {
    const { boldType } = this.getAttrs(this.state.editorStore)
    this.handleChange('boldType', 1 - boldType)
  }

  handleItalic = () => {
    const { fontStyle } = this.getAttrs(this.state.editorStore)
    this.handleChange('fontStyle', fontStyle !== 'italic' ? 'italic' : 'normal')
  }

  handleDecoration = e => {
    const { decoration } = e.target.dataset
    const { textDecoration } = this.getAttrs(this.state.editorStore)
    this.handleChange('textDecoration', textDecoration !== decoration ? decoration : 'none')
  }

  handleChange = (attr, val) => editorBridge.setAttr(attr, val)

  render() {
    const { editorStore } = this.state

    const {
      fontFamily,
      fontWeight,
      fontSize,
      color,
      boldType,
      fontStyle,
      textDecoration,
      letterSpacing,
      lineHeight,
      paraSpacing
    } = this.getAttrs(editorStore)

    return (
      <div className="playground">
        <div className="editor-wrapper">
          <div className="cross-r" />
          <div className="cross-c" />
          <Editor
            onSelectionChange={this.handleSelectionChange}
            store={INITIAL_EDITOR_STORE}
          />
        </div>
        <div className="setter-wrapper">
          <p  className='title'>Rich Text Editor</p>
          <div className="setter-item">
            <div className="setter-item-name">Typeface</div>
            <Select
              className={`setter-item-selector ${squeezeSpace(fontFamily)}`}
              popupClassName={`${squeezeSpace(fontFamily)}`}
              size="small"
              value={fontFamily}
              options={FONT_FAMILY_LIST}
              onChange={this.handleFontFamilyChange}
            />
          </div>
          <div className="setter-item">
            <div className="setter-item-name">Weight</div>
            <Select
              className={`setter-item-selector weight-${fontWeight} ${squeezeSpace(fontFamily)}`}
              popupClassName={`${squeezeSpace(fontFamily)}`}
              size="small"
              value={fontWeight}
              options={FONT_WEIGHT_MAP[fontFamily]}
              onChange={this.handleFontWeightChange}
            />
          </div>
          <div className="setter-item">
            <div className="setter-item-name">Size</div>
            <Select
              className="setter-item-selector"
              size="small"
              value={fontSize}
              options={FONT_SIZE_LIST}
              onChange={this.handleFontSizeChange}
            />

            <ColorPicker value={color} onChange={this.handleColorChange}>
              <div className="color-btn"
              >
                <svg width="24px" height="24px" viewBox="0 0 55 52">
                  <path
                    d="M0.56640625,19.2539063 C13.0063049,18.7402651 41.4803326,4.30370135 46.5703125,4.6328125 C52.206531,4.99724269 40.2953388,14.1089514 36.3359375,18.1367188 C30.5128426,24.0603596 11.4015694,28.5604564 17.3867188,34.3203125 C23.81514,40.5067548 34.0208793,19.1260224 41.8359375,23.4296875 C48.150187,26.906874 31.6160152,33.9365778 28.4453125,40.4101563 C27.7294737,41.8716741 31.7887505,41.4216824 33.3085938,40.8398438 C37.8755037,39.0915025 41.5864946,35.5398777 46.0976562,33.6523438 C54.5544392,30.1139061 7.0259851,66.7736666 51.890625,30.4609375"
                    stroke={color}
                    strokeWidth="10"
                    fill="none"
                    fillRule="nonzero"
                  />
                </svg>
              </div>
            </ColorPicker>
          </div>
          <div className="setter-item">
            <div className="setter-item-name">Style</div>
            <span
              className={`text-icon style-bold${boldType === 1 ? ' active' : ''}`}
              onClick={this.handleBold}
              >T</span>
            <span
              className={`text-icon style-italic${fontStyle === 'italic' ? ' active' : ''}`}
              onClick={this.handleItalic}
              >T</span>
            <span
              className={`text-icon decoration-underline${textDecoration === 'underline' ? ' active' : ''}`}
              data-decoration="underline"
              onClick={this.handleDecoration}
              >T</span>
            <span
              className={`text-icon decoration-line-through${textDecoration === 'line-through' ? ' active' : ''}`}
              data-decoration="line-through"
              onClick={this.handleDecoration}
              >T</span>
          </div>
          <div className="setter-item setter-group-item">
            <div className="setter-item-name">Spacing</div>
            <div className="setter-sub-item-group">
              <div className="setter-sub-item">
                <InputNumber 
                  className="setter-sub-item-input"
                  size="small"
                  value={letterSpacing}
                  step={0.1}
                  precision={1}
                  min={-999}
                  max={999}
                  onChange={this.handleLetterSpacingChange}
                />
                <label className="setter-sub-item-name">Character</label>
              </div>
              <div className="setter-sub-item">
                <InputNumber 
                  className="setter-sub-item-input"
                  size="small"
                  value={lineHeight}
                  precision={0}
                  min={-999}
                  max={999}
                  onChange={this.handleLineHeightChange}
                />
                <label className="setter-sub-item-name">Line</label>
              </div>
              <div className="setter-sub-item">
                <InputNumber 
                  className="setter-sub-item-input"
                  size="small"
                  value={paraSpacing}
                  precision={0}
                  min={-999}
                  max={999}
                  onChange={this.handleParaSpacingChange}
                />
                <label className="setter-sub-item-name">Paragraph</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const squeezeSpace = str => str.replace(/\s/g, '')

const FONT_FAMILY_LIST = [
  {
    value: 'Arial',
    label: 'Arial',
    className: 'Arial'
  },
  {
    value: 'Courier New',
    label: 'Courier New',
    className: 'Courier New'
  },
  {
    value: 'Times New Roman',
    label: 'Times New Roman',
    className: 'Times New Roman'
  },
  {
    value: 'Trebuchet MS',
    label: 'Trebuchet MS',
    className: 'Trebuchet MS'
  },
  {
    value: 'Verdana',
    label: 'Verdana',
    className: 'Verdana'
  }
]

const FONT_WEIGHT_MAP = {
  'Arial': [
    {
      value: 'regular',
      label: 'regular',
      className: 'regular'
    },
    {
      value: 'bold',
      label: 'bold',
      className: 'bold'
    }
  ],
  'Courier New': [
    {
      value: 'regular',
      label: 'regular',
      className: 'regular'
    },
    {
      value: 'bold',
      label: 'bold',
      className: 'bold'
    }
  ],
  'Times New Roman': [
    {
      value: 'regular',
      label: 'regular',
      className: 'regular'
    },
    {
      value: 'bold',
      label: 'bold',
      className: 'bold'
    }
  ],
  'Trebuchet MS': [
    {
      value: 'regular',
      label: 'regular',
      className: 'regular'
    },
    {
      value: 'bold',
      label: 'bold',
      className: 'bold'
    }
  ],
  'Verdana': [
    {
      value: 'regular',
      label: 'regular',
      className: 'regular'
    },
    {
      value: 'bold',
      label: 'bold',
      className: 'bold'
    }
  ],
}

const FONT_SIZE_LIST = [
  {
    value: 12,
    label: 12,
  },
  {
    value: 13,
    label: 13,
  },
  {
    value: 14,
    label: 14,
  },
  {
    value: 16,
    label: 16,
  },
  {
    value: 18,
    label: 18,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 24,
    label: 24,
  },
  {
    value: 28,
    label: 28,
  },
  {
    value: 36,
    label: 36,
  },
  {
    value: 48,
    label: 48,
  },
  {
    value: 72,
    label: 72,
  }]

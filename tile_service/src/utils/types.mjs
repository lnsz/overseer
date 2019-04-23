import {
  BORDER_STYLES,
  FONT_FAMILIES,
  FONT_STYLES,
  CSS_UNITS
} from './styles.mjs'

// Types for the tile schema

// TILE POSITIONING
export const LAYOUT_TYPE = {
  width: Number,
  height: Number,
  x: Number,
  y: Number
}

const UNIT_TYPE = {
  type: String,
  enum: CSS_UNITS,
  default: CSS_UNITS[0]
}

// FONTS
const FONT_FAMILY_TYPE = {
  type: String,
  enum: FONT_FAMILIES,
  default: FONT_FAMILIES[0]
}

const FONT_STYLE_TYPE = {
  type: String,
  enum: FONT_STYLES,
  default: FONT_STYLES[0]
}

const FONT_TYPE = {
  color: String,
  weight: Number,
  size: Number,
  sizeUnit: UNIT_TYPE,
  family: FONT_FAMILY_TYPE,
  style: FONT_STYLE_TYPE
}

// BACKGROUNDS
const BACKGROUND_TYPE = {
  color: String
}

// BORDERS
const BORDER_STYLE_TYPE = {
  type: String,
  enum: BORDER_STYLES,
  default: BORDER_STYLES[0]
}

const BORDER_SIDE_TYPE = {
  color: String,
  width: Number,
  widthUnit: UNIT_TYPE,
  radius: Number,
  radiusUnit: UNIT_TYPE,
  style: BORDER_STYLE_TYPE
}

const BORDER_TYPE = {
  top: BORDER_SIDE_TYPE,
  bottom: BORDER_SIDE_TYPE,
  right: BORDER_SIDE_TYPE,
  left: BORDER_SIDE_TYPE
}

// SHADOWS
const SHADOW_TYPE = {
  textShadow: String,
  boxShadow: String
}

// SPACING
const SIZE_TYPE = {
  size: Number,
  unit: UNIT_TYPE
}

const MARGIN_TYPE = {
  top: SIZE_TYPE,
  bottom: SIZE_TYPE,
  left: SIZE_TYPE,
  right: SIZE_TYPE
}

const PADDING_TYPE = {
  top: SIZE_TYPE,
  bottom: SIZE_TYPE,
  left: SIZE_TYPE,
  right: SIZE_TYPE
}

const SPACING_TYPE = {
  margin: MARGIN_TYPE,
  padding: PADDING_TYPE
}

// OUTLINES
const OUTLINE_TYPE = {
  color: String,
  style: BORDER_STYLE_TYPE,
  width: Number,
  widthUnit: UNIT_TYPE,
  offset: Number,
  offsetUnit: UNIT_TYPE
}

export const STYLE_TYPE = {
  font: FONT_TYPE,
  background: BACKGROUND_TYPE,
  border: BORDER_TYPE,
  shadow: SHADOW_TYPE,
  spacing: SPACING_TYPE,
  outline: OUTLINE_TYPE
}

export const INTEGRATION_TYPE = {
  url: String,
  refreshTimer: String
}
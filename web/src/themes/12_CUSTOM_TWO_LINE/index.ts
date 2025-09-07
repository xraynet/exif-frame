import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const CUSTOM_TWO_LINE_OPTIONS: ThemeOption[] = [
  { id: '背景颜色 BACKGROUND_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: '内边距 PADDING_INSIDE', type: 'boolean', default: true, description: 'enable to use inside padding' },
  { id: '上边距 PADDING_TOP', type: 'number', default: 100, description: 'px' },
  { id: '下边距 PADDING_BOTTOM', type: 'number', default: 350, description: 'px' },
  { id: '左边距 PADDING_LEFT', type: 'number', default: 100, description: 'px' },
  { id: '右边距 PADDING_RIGHT', type: 'number', default: 100, description: 'px' },
  { id: '文本1 TEXT1', type: 'string', default: 'Your Text', description: 'ex. Hello, World!' },
  { id: '文本2 TEXT2', type: 'string', default: 'Your Text', description: 'ex. Hello, World!' },
  { id: '文字透明度 TEXT_ALPHA', type: 'range-slider', default: 1, min: 0, max: 1, step: 0.01, description: '0 - 1' },
  { id: '文字颜色 TEXT_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: '文字对齐方式 TEXT_ALIGN', type: 'select', options: ['center', 'right', 'left'], default: 'center', description: 'left or center or right' },
  { id: '字体样式 FONT_STYLE', type: 'select', options: ['normal', 'italic'], default: 'normal', description: 'normal or italic' },
  { id: '字体粗细 FONT_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 - 900' },
  { id: '字体大小 FONT_SIZE', type: 'number', default: 70, description: 'px' },
  { id: '字体 FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
];

const CUSTOM_TWO_LINE_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const BACKGROUND_COLOR = (input.get('背景颜色 BACKGROUND_COLOR') as string).trim();
  const PADDING_INSIDE = input.get('内边距 PADDING_INSIDE') as boolean;
  const PADDING_TOP = input.get('上边距 PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('下边距 PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('左边距 PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('右边距 PADDING_RIGHT') as number;
  const TEXT1 = input.get('文本1 TEXT1') as string;
  const TEXT2 = input.get('文本2 TEXT2') as string;
  const TEXT_ALPHA = input.get('文字透明度 TEXT_ALPHA') as number;
  const TEXT_COLOR = input.get('文字颜色 TEXT_COLOR') as string;
  const TEXT_ALIGN = (input.get('文字对齐方式 TEXT_ALIGN') as string).trim() as CanvasTextAlign;
  const FONT_STYLE = (input.get('字体样式 FONT_STYLE') as string).trim();
  const FONT_WEIGHT = input.get('字体粗细 FONT_WEIGHT') as number;
  const FONT_SIZE = input.get('字体大小 FONT_SIZE') as number;
  const FONT_FAMILY = (input.get('字体 FONT_FAMILY') as string).trim();

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: PADDING_INSIDE ? { top: 0, right: 0, bottom: 0, left: 0 } : { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'middle';
  context.font = `${FONT_STYLE} ${FONT_WEIGHT} ${FONT_SIZE}px ${FONT_FAMILY}`;
  context.textAlign = TEXT_ALIGN as CanvasTextAlign;
  context.globalAlpha = TEXT_ALPHA;
  context.fillText(TEXT1, TEXT_ALIGN === 'left' ? PADDING_LEFT : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM / 2 - FONT_SIZE / 1.5);
  context.fillText(TEXT2, TEXT_ALIGN === 'left' ? PADDING_LEFT : TEXT_ALIGN === 'center' ? canvas.width / 2 : canvas.width - PADDING_RIGHT, canvas.height - PADDING_BOTTOM / 2 + FONT_SIZE / 1.5);
  context.globalAlpha = 1;

  return canvas;
};

export { CUSTOM_TWO_LINE_FUNC, CUSTOM_TWO_LINE_OPTIONS };

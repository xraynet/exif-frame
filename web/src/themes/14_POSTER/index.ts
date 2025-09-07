import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const POSTER_OPTIONS: ThemeOption[] = [
  { id: '深色模式 DARK_MODE', type: 'boolean', default: false, description: 'enable to use dark mode' },
  { id: '上边距 PADDING_TOP', type: 'number', default: 400, description: 'px' },
  { id: '下边距 PADDING_BOTTOM', type: 'number', default: 400, description: 'px' },
  { id: '左边距 PADDING_LEFT', type: 'number', default: 150, description: 'px' },
  { id: '文本1 TEXT1', type: 'string', default: '2001.01.01' },
  { id: '文本2 TEXT2', type: 'string', default: 'Lorem Ipsum' },
  { id: '文本3 TEXT3', type: 'string', default: 'dolor sit amet, consectetur' },
  { id: '文本4 TEXT4', type: 'string', default: 'White House' },
  { id: '文本5 TEXT5', type: 'string', default: '1600 Pennsylvania Avenue NW, Washington, DC 20500' },
  { id: '文本1字号 TEXT1_SIZE', type: 'number', default: 80, description: 'px' },
  { id: '文本1粗细 TEXT1_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 ~ 900' },
  { id: '文本2字号 TEXT2_SIZE', type: 'number', default: 200, description: 'px' },
  { id: '文本2粗细 TEXT2_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: '文本3字号 TEXT3_SIZE', type: 'number', default: 200, description: 'px' },
  { id: '文本3粗细 TEXT3_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: '文本4字号 TEXT4_SIZE', type: 'number', default: 150, description: 'px' },
  { id: '文本4粗细 TEXT4_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: '文本5字号 TEXT5_SIZE', type: 'number', default: 80, description: 'px' },
  { id: '文本5粗细 TEXT5_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 300, description: '100 ~ 900' },
  { id: '字体 FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: '阴影 SHADOW_SIZE', type: 'number', default: 10, description: '0 ~ 100' },
];

const POSTER_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const DARK_MODE = input.get('深色模式 DARK_MODE') as boolean;
  const PADDING_TOP = input.get('上边距 PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('下边距 PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('左边距 PADDING_LEFT') as number;
  const TEXT1 = (input.get('文本1 TEXT1') as string).trim();
  const TEXT2 = (input.get('文本2 TEXT2') as string).trim();
  const TEXT3 = (input.get('文本3 TEXT3') as string).trim();
  const TEXT4 = (input.get('文本4 TEXT4') as string).trim();
  const TEXT5 = (input.get('文本5 TEXT5') as string).trim();
  const TEXT1_SIZE = input.get('文本1字号 TEXT1_SIZE') as number;
  const TEXT1_WEIGHT = input.get('文本1粗细 TEXT1_WEIGHT') as number;
  const TEXT2_SIZE = input.get('文本2字号 TEXT2_SIZE') as number;
  const TEXT2_WEIGHT = input.get('文本2粗细 TEXT2_WEIGHT') as number;
  const TEXT3_SIZE = input.get('文本3字号 TEXT3_SIZE') as number;
  const TEXT3_WEIGHT = input.get('文本3粗细 TEXT3_WEIGHT') as number;
  const TEXT4_SIZE = input.get('文本4字号 TEXT4_SIZE') as number;
  const TEXT4_WEIGHT = input.get('文本4粗细 TEXT4_WEIGHT') as number;
  const TEXT5_SIZE = input.get('文本5字号 TEXT5_SIZE') as number;
  const TEXT5_WEIGHT = input.get('文本5粗细 TEXT5_WEIGHT') as number;
  const FONT_FAMILY = (input.get('字体 FONT_FAMILY') as string).trim();
  const SHADOW_SIZE = input.get('阴影 SHADOW_SIZE') as number;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: DARK_MODE ? '#ffffff' : '#000000',
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = DARK_MODE ? '#000000' : '#ffffff';
  context.shadowColor = DARK_MODE ? '#ffffff' : '#000000';
  context.shadowBlur = SHADOW_SIZE;
  context.textBaseline = 'middle';
  context.textAlign = 'left';

  context.font = `normal ${TEXT1_WEIGHT} ${TEXT1_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT1, PADDING_LEFT, PADDING_TOP);

  context.font = `normal ${TEXT2_WEIGHT} ${TEXT2_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT2, PADDING_LEFT, PADDING_TOP + TEXT1_SIZE * 2);

  context.font = `normal ${TEXT3_WEIGHT} ${TEXT3_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT3, PADDING_LEFT, PADDING_TOP + TEXT1_SIZE * 2 + TEXT2_SIZE * 1.2);

  context.font = `normal ${TEXT4_WEIGHT} ${TEXT4_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT4, PADDING_LEFT, canvas.height - PADDING_BOTTOM - TEXT5_SIZE * 1.5);

  context.font = `normal ${TEXT5_WEIGHT} ${TEXT5_SIZE}px ${FONT_FAMILY}`;
  context.fillText(TEXT5, PADDING_LEFT, canvas.height - PADDING_BOTTOM);

  return canvas;
};

export { POSTER_FUNC, POSTER_OPTIONS };

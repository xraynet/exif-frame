import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const TIP_OPTIONS: ThemeOption[] = [
  { id: '深色模式 DARK_MODE', type: 'boolean', default: false, description: 'enable to use dark mode' },
  { id: '隐藏文字 HIDE_TEXT', type: 'boolean', default: false, description: 'hide text' },
  { id: '标签 TAG', type: 'string', default: 'TIP' },
  { id: '标题 TITLE', type: 'string', default: '01. Lorem ipsum' },
  { id: '描述1 DESCRIPTION1', type: 'string', default: 'Pellentesque a pharetra justo' },
  { id: '描述2 DESCRIPTION2', type: 'string', default: 'Nam maximus risus et rhoncus eleifend' },
  { id: '上边距 PADDING_TOP', type: 'number', default: 250, description: 'px' },
  { id: '下边距 PADDING_BOTTOM', type: 'number', default: 125, description: 'px' },
  { id: '标签字号 TAG_SIZE', type: 'number', default: 140, description: 'px' },
  { id: '标签粗细 TAG_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 700, description: '100 ~ 900' },
  { id: '标题字号 TITLE_SIZE', type: 'number', default: 120, description: 'px' },
  { id: '标题粗细 TITLE_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: '描述字号 DESCRIPTION_SIZE', type: 'number', default: 95, description: 'px' },
  { id: '描述粗细 DESCRIPTION_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 200, description: '100 ~ 900' },
  { id: 'EXIF字号 EXIF_SIZE', type: 'number', default: 60, description: 'px' },
  { id: 'EXIF粗细 EXIF_WEIGHT', type: 'range-slider', min: 100, max: 900, step: 100, default: 500, description: '100 ~ 900' },
  { id: '字体 FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'Barlow', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: '阴影 SHADOW_SIZE', type: 'number', default: 10, description: '0 ~ 100' },
];

const TIP_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const DARK_MODE = input.get('深色模式 DARK_MODE') as boolean;
  const HIDE_TEXT = input.get('隐藏文字 HIDE_TEXT') as boolean;
  const TAG = (input.get('标签 TAG') as string).trim();
  const TITLE = (input.get('标题 TITLE') as string).trim();
  const DESCRIPTION1 = (input.get('描述1 DESCRIPTION1') as string).trim();
  const DESCRIPTION2 = (input.get('描述2 DESCRIPTION2') as string).trim();
  const PADDING_TOP = input.get('上边距 PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('下边距 PADDING_BOTTOM') as number;
  const TAG_SIZE = input.get('标签字号 TAG_SIZE') as number;
  const TAG_WEIGHT = input.get('标签粗细 TAG_WEIGHT') as number;
  const TITLE_SIZE = input.get('标题字号 TITLE_SIZE') as number;
  const TITLE_WEIGHT = input.get('标题粗细 TITLE_WEIGHT') as number;
  const DESCRIPTION_SIZE = input.get('描述字号 DESCRIPTION_SIZE') as number;
  const DESCRIPTION_WEIGHT = input.get('描述粗细 DESCRIPTION_WEIGHT') as number;
  const EXIF_SIZE = input.get('EXIF字号 EXIF_SIZE') as number;
  const EXIF_WEIGHT = input.get('EXIF粗细 EXIF_WEIGHT') as number;
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
  context.textAlign = 'center';

  if (!HIDE_TEXT) {
    context.font = `normal ${TAG_WEIGHT} ${TAG_SIZE}px ${FONT_FAMILY}`;
    context.fillText(TAG, canvas.width / 2, PADDING_TOP);

    context.font = `normal ${TITLE_WEIGHT} ${TITLE_SIZE}px ${FONT_FAMILY}`;
    context.fillText(TITLE, canvas.width / 2, PADDING_TOP + TAG_SIZE + TITLE_SIZE / 2);

    context.font = `normal ${DESCRIPTION_WEIGHT} ${DESCRIPTION_SIZE}px ${FONT_FAMILY}`;
    context.fillText(DESCRIPTION1, canvas.width / 2, canvas.height - PADDING_BOTTOM - EXIF_SIZE - DESCRIPTION_SIZE * 2.2);
    context.fillText(DESCRIPTION2, canvas.width / 2, canvas.height - PADDING_BOTTOM - EXIF_SIZE - DESCRIPTION_SIZE);
  }

  if (!store.disableExposureMeter) {
    const exifWidth = canvas.width / 2;
    context.font = `normal ${EXIF_WEIGHT} ${EXIF_SIZE}px ${FONT_FAMILY}`;
    context.fillText(`${photo.fNumber?.replace('f/', 'F')}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 1, canvas.height - PADDING_BOTTOM);
    context.fillText(`${photo.exposureTime}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 2, canvas.height - PADDING_BOTTOM);
    context.fillText(`${photo.iso}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 3, canvas.height - PADDING_BOTTOM);
    context.fillText(`${photo.focalLength}`, canvas.width / 2 - exifWidth / 2 + (exifWidth / 5) * 4, canvas.height - PADDING_BOTTOM);
  }

  return canvas;
};

export { TIP_FUNC, TIP_OPTIONS };

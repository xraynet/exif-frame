import Photo from '../../core/photo';
import { Store } from '../../store';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';
import Font from '../../fonts';

const FILM_OPTIONS: ThemeOption[] = [
  { id: '作者 ARTIST', type: 'string', default: '', description: 'your name' },
  { id: '字体 FONT_FAMILY', type: 'select', options: ['Barlow', ...Object.values(Font)], default: 'digital-7', description: 'ex. din-alternate-bold, digital-7, Barlow, Arial, sans-serif' },
  { id: '文字颜色 TEXT_COLOR', type: 'color', default: '#FFA500', description: 'default is orange hex code' },
  { id: '文字透明度 TEXT_ALPHA', type: 'range-slider', default: 1, min: 0, max: 1, step: 0.01, description: '0 - 1' },
  { id: '背景颜色 BACKGROUND_COLOR', type: 'color', default: '#000000', description: '#ffffff is white, #000000 is black' },
  { id: '上边距 PADDING_TOP', type: 'number', default: 0, description: 'px' },
  { id: '下边距 PADDING_BOTTOM', type: 'number', default: 0, description: 'px' },
  { id: '左边距 PADDING_LEFT', type: 'number', default: 0, description: 'px' },
  { id: '右边距 PADDING_RIGHT', type: 'number', default: 0, description: 'px' },
];

const FILM_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store: Store) => {
  const ARTIST = (input.get('作者 ARTIST') as string).trim();
  const FONT_FAMILY = (input.get('字体 FONT_FAMILY') as string).trim();
  const TEXT_COLOR = input.get('文字颜色 TEXT_COLOR') as string;
  const TEXT_ALPHA = input.get('文字透明度 TEXT_ALPHA') as number;
  const BACKGROUND_COLOR = (input.get('背景颜色 BACKGROUND_COLOR') as string).trim();
  const PADDING_TOP = input.get('上边距 PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('下边距 PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('左边距 PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('右边距 PADDING_RIGHT') as number;

  const canvas = sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });

  const context = canvas.getContext('2d')!;
  context.fillStyle = TEXT_COLOR;
  context.textBaseline = 'bottom';
  context.globalAlpha = TEXT_ALPHA;

  if (!store.disableExposureMeter) {
    const datas = [
      ...(photo.iso ? [{ key: 'ISO', value: photo.iso.replace('ISO', '') }] : []),
      ...(photo.exposureTime ? [{ key: 'SEC', value: photo.exposureTime.replace('s', '') }] : []),
      ...(photo.fNumber ? [{ key: 'F', value: photo.fNumber.replace('F', '') }] : []),
    ];

    context.textAlign = 'right';
    context.font = `100px ${FONT_FAMILY}`;
    for (let i = 0; i < datas.length; i++) {
      const data = datas[i];
      context.fillText(data.value, canvas.width - 100, canvas.height - 100 - i * 100);
      const width = context.measureText(data.value).width;
      context.font = `60px ${FONT_FAMILY}`;
      context.fillText(data.key, canvas.width - 100 - width - 20, canvas.height - 110 - i * 100);
      context.font = `100px ${FONT_FAMILY}`;
    }
  }

  context.font = `70px ${FONT_FAMILY}`;
  context.textAlign = 'left';
  context.fillText(
    [store.showLensModel ? store.overrideLensModel || photo.lensModel : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    100,
    canvas.height - 105
  );
  context.fillText(
    [store.showCameraMaker ? store.overrideCameraMaker || photo.make : null, store.showCameraModel ? store.overrideCameraModel || photo.model : null]
      .filter(Boolean)
      .map((value) => value!.trim())
      .join(' '),
    100,
    canvas.height - 205
  );
  context.font = `50px ${FONT_FAMILY}`;
  context.fillText(ARTIST ? ARTIST : photo.takenAt, 100, canvas.height - 305);

  context.globalAlpha = 1;

  return canvas;
};

export { FILM_FUNC, FILM_OPTIONS };

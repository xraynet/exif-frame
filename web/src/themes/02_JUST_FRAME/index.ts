import Photo from '../../core/photo';
import sandbox from '../../core/drawing/sandbox';
import { ThemeFunc } from '../../core/drawing/theme';
import { ThemeOption, ThemeOptionInput } from '../../pages/theme/types/theme-option';

const JUST_FRAME_OPTIONS: ThemeOption[] = [
  { id: '背景颜色 BACKGROUND_COLOR', type: 'color', default: '#ffffff', description: '#ffffff is white, #000000 is black' },
  { id: '上边距 PADDING_TOP', type: 'number', default: 100, description: 'px' },
  { id: '下边距 PADDING_BOTTOM', type: 'number', default: 100, description: 'px' },
  { id: '左边距 PADDING_LEFT', type: 'number', default: 100, description: 'px' },
  { id: '右边距 PADDING_RIGHT', type: 'number', default: 100, description: 'px' },
];

const JUST_FRAME_FUNC: ThemeFunc = (photo: Photo, input: ThemeOptionInput, store) => {
  const BACKGROUND_COLOR = (input.get('背景颜色 BACKGROUND_COLOR') as string).trim();
  const PADDING_TOP = input.get('上边距 PADDING_TOP') as number;
  const PADDING_BOTTOM = input.get('下边距 PADDING_BOTTOM') as number;
  const PADDING_LEFT = input.get('左边距 PADDING_LEFT') as number;
  const PADDING_RIGHT = input.get('右边距 PADDING_RIGHT') as number;

  return sandbox(photo, {
    targetRatio: store.ratio,
    notCroppedMode: store.notCroppedMode,
    backgroundColor: BACKGROUND_COLOR,
    padding: { top: PADDING_TOP, right: PADDING_RIGHT, bottom: PADDING_BOTTOM, left: PADDING_LEFT },
  });
};

export { JUST_FRAME_FUNC, JUST_FRAME_OPTIONS };

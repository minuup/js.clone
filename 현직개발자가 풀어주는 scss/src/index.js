import './styles/main.scss';
import { querySelector } from './utils/domUtil';
import { css, html } from 'lit';

const numberOneToZero = (number) => (number > 1 ? 1 : number > 0 ? number : 0);

const sectionFirst = querySelector('#section_first');
const background = querySelector('#background');
const animatedTitle = querySelector('.animated_title');
const animatedDesc1 = querySelector('.animated_desc1');
const animatedDesc2 = querySelector('.animated_desc2');
const animatedDesc3 = querySelector('.animated_desc3');

const startTopOffset = 100;
const delayDesc = 150;
const maxScaleBackground = 0.58;
const maxDarkenBackground = 0.58;
const firstDarkenBackground = 0.3;

window.addEventListener('scroll', () => {
  // 스크롤 기준점
  const scroll = window.pageYOffset * 1;

  // 탑 오프셋
  const topTitle = animatedTitle.offsetTop;
  const topDesc1 = animatedDesc1.offsetTop;
  const topDesc2 = animatedDesc2.offsetTop;
  const topDesc3 = animatedDesc3.offsetTop;

  // 섹션 변수
  const heightSectionFirst = sectionFirst.offsetHeight;
  const pixelUnderFirstSection = heightSectionFirst - scroll;

  const isNeedFirstSectionOpacityOff = pixelUnderFirstSection < 0;
  const firstSectionOpacity =
    (200 + pixelUnderFirstSection) / 200 > 0
      ? (200 + pixelUnderFirstSection) / 200
      : 0;

  // 텍스트 불투명도 인자
  const argOpacityTitle = (topTitle + startTopOffset - scroll) / 120;
  const argOpacityDesc1 =
    -(topDesc1 + startTopOffset + delayDesc - scroll) / 120;
  const argOpacityDesc2 =
    -(topDesc2 + startTopOffset + delayDesc - scroll) / 120;
  const argOpacityDesc3 =
    -(topDesc3 + startTopOffset + delayDesc - scroll) / 120;

  // 배경 크기, 어둡기 인자
  const ratioBackground =
    1 - numberOneToZero(-((scroll - heightSectionFirst) / heightSectionFirst));
  const scaleUpSize = ratioBackground * maxScaleBackground;
  const darkenSize =
    firstDarkenBackground + ratioBackground * maxDarkenBackground;

  const backgroundScale = 1 + scaleUpSize;
  const backgroundDarken = 1 - darkenSize;

  sectionFirst.style = css`
    opacity: ${isNeedFirstSectionOpacityOff ? firstSectionOpacity : 1};
  `;
  animatedTitle.style = css`
    opacity: ${numberOneToZero(argOpacityTitle)};
  `;
  animatedDesc1.style = css`
    opacity: ${numberOneToZero(argOpacityDesc1)};
    transform: translateY(${20 - numberOneToZero(argOpacityDesc1) * 20}px);
  `;
  animatedDesc2.style = css`
    opacity: ${numberOneToZero(argOpacityDesc2)};
    transform: translateY(${20 - numberOneToZero(argOpacityDesc2) * 20}px);
  `;
  animatedDesc3.style = css`
    opacity: ${numberOneToZero(argOpacityDesc3)};
    transform: translateY(${20 - numberOneToZero(argOpacityDesc3) * 20}px);
  `;
  background.style = css`
    transform: scale(${backgroundScale});
    filter: brightness(${backgroundDarken});
  `;
});

// 햄버거 버튼
const collapse = document.querySelector('#collapse');
const menu = document.querySelector('#menu');

collapse.addEventListener('click', (e) => {
  switch (e.currentTarget.className) {
    case 'unopen':
      e.currentTarget.className = 'open';
      menu.className = 'open';
      break;
    case 'open':
      e.currentTarget.className = 'unopen';
      menu.className = 'unopen';
      break;

    default:
      break;
  }
});

const renderSize = (placeholder, width, ratioW, ratioH) => {
  const height = Math.round(width * ratioH / ratioW);
  if (placeholder) return `https://via.placeholder.com/${width}x${height}.jpg`;
  return `${width}_${height}.jpg`;
};

const renderResult = ({ columns, sm, md, lg, xl, smW, mdW, lgW, xlW, ratioW, ratioH, placeholder }) => {
    const p = placeholder;

    const isXlFull = xlW === 0;
    const fXl = isXlFull ? 1 : 1 * xlW / columns;

    const isLgFull = lgW === 0;
    const fLg = isLgFull ? 1 : 1 * lgW / columns;

    const isMdFull = mdW === 0;
    const fMd = isMdFull ? 1 : 1 * mdW / columns;

    const isSmFull = smW === 0;
    const fSm = isSmFull ? 1 : 1 * smW / columns;

    return `
    <picture>
      <source
        media="(min-width: ${xl}px)"
        srcset="${
          renderSize(p, isXlFull ? 1920 : xl * fXl, ratioW, ratioH)
        } 1x,${
          renderSize(p, isXlFull ? 2880 : xl * fXl * 2, ratioW, ratioH)
        } 2x">
      <source
        media="(min-width: ${lg}px)"
        srcset="${
          renderSize(p, xl * fXl, ratioW, ratioH)
        } 1x,${
          renderSize(p, xl * fXl * 2, ratioW, ratioH)
        } 2x">
      <source
        media="(min-width: ${md}px)"
        srcset="${
          renderSize(p, lg * fLg, ratioW, ratioH)
        } 1x,${
          renderSize(p, lg * fLg * 2, ratioW, ratioH)
        } 2x">
      <source
        media="(min-width: ${sm + 1}px)"
        srcset="${
          renderSize(p, md * fMd, ratioW, ratioH)
        } 1x,${
          renderSize(p, md * fMd * 2, ratioW, ratioH)
        } 2x">
      <source
        media="(max-width: ${sm}px)"
        srcset="${
          renderSize(p, sm * fSm, ratioW, ratioH)
        } 1x,${
          renderSize(p, sm * fSm * 2, ratioW, ratioH)
        } 2x">
      <img src="${
        renderSize(p, isXlFull ? 1920 : xl * fXl, ratioW, ratioH)
      }" class="img-fluid" alt="ALT">
    </picture>
  `;
};

const formatResult = func => func.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');

const columnsField = document.getElementById('columns');
const smWidthField = document.getElementById('breakpoint-sm');
const mdWidthField = document.getElementById('breakpoint-md');
const lgWidthField = document.getElementById('breakpoint-lg');
const xlWidthField = document.getElementById('breakpoint-xl');
const imgSmWidthField = document.getElementById('img-sm-width');
const imgMdWidthField = document.getElementById('img-md-width');
const imgLgWidthField = document.getElementById('img-lg-width');
const imgXlWidthField = document.getElementById('img-xl-width');
const ratioWidthField = document.getElementById('ratio-width');
const ratioHeightField = document.getElementById('ratio-height');
const placeholder = document.getElementById('placeholder');

const result = document.getElementById('result');

const getParams = () => {
  return {
    columns: parseInt(columnsField.value, 10),
    sm: parseInt(smWidthField.value, 10),
    md: parseInt(mdWidthField.value, 10),
    lg: parseInt(lgWidthField.value, 10),
    xl: parseInt(xlWidthField.value, 10),
    smW: parseInt(imgSmWidthField.value, 10),
    mdW: parseInt(imgMdWidthField.value, 10),
    lgW: parseInt(imgLgWidthField.value, 10),
    xlW: parseInt(imgXlWidthField.value, 10),
    ratioW: parseInt(ratioWidthField.value, 10),
    ratioH: parseInt(ratioHeightField.value, 10),
    placeholder: placeholder.checked,
  }
};

const render = () => {
  result.innerHTML = formatResult(renderResult(getParams()));
};

render();
for (const el of document.querySelectorAll('input')) {
  el.addEventListener('blur', (e) => render());
}

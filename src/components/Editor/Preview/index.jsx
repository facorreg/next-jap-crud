/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import PropTypes from 'proptypes';

import styles from '@styles/editor.module.scss';

const Preview = ({ blocks }) => {
  if (!blocks.length) return <></>;
  const innerHtml = blocks?.map((block, i) => {
    const elements = {
      header: ({ data: { level } }) => `h${level}`,
      paragraph: () => 'p',
    };

    const elem = document.createElement(elements[block.type](block));
    elem.innerHTML = block.data.text;
    elem.setAttribute('key', `${block.type}-${i}`);

    return elem;
  });

  if (!innerHtml) return <></>;

  return (
    <div
      className={styles.preview}
      dangerouslySetInnerHTML={{ __html: innerHtml.map((e) => e.outerHTML).join('') }}
    />
  );
};

Preview.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.shape({
        level: PropTypes.number,
        text: PropTypes.string,
      }),
      type: PropTypes.string,
    }),
  ),
};

Preview.defaultProps = {
  blocks: [],
};

export default Preview;

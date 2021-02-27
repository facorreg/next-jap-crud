/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import Header from '@editorjs/header';
import List from '@editorjs/list';
import axios from 'axios';
import Cookies from 'js-cookie';
import PropTypes from 'proptypes';
import { useState, useEffect, useRef } from 'react';
import EditorJs from 'react-editor-js';

import useAuth from '@hooks/useAuth';
import styles from '@styles/editor.module.scss';
import { getEnv } from '@utils';

import Preview from './Preview';

const editorOptions = (notes) => ({
  // autofocus: true,

  data: (() => {
    const data = notes || Cookies.get('editor');
    if (!data) return {};
    const parsed = JSON.parse(data);
    return parsed || {};
  })(),
  holder: 'editorjs',
  tools: {
    header: {
      class: Header,
      inlineToolbar: ['link'],
    },
    list: {
      class: List,
      inlineToolbar: true,
    },
  },
});

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Editor({ id, notes, refetch, title }) {
  const [outputData, setOutputdata] = useState(false);
  const [notesId, setNotesId] = useState(id);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const editor = useRef(null);
  const { userId } = useAuth();

  let timer;
  useEffect(() => {
    if (outputData !== null) Cookies.set('editor', JSON.stringify(outputData));
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [outputData, id]);

  const saveHandler = async (e, saveToBackend) => {
    if (!editor.current) return;
    try {
      const d = await editor?.current?.save();

      setOutputdata(d);

      if (!outputData && saveToBackend) setError('Saving failed');
      if (!outputData) return;
      const refTitle = inputRef.current.value;
      if (saveToBackend && refTitle && d.blocks?.length) {
        const url = `${getEnv('API_ENDPOINT', 'http://localhost:4000')}/notes`;
        const notestosend = JSON.stringify(outputData);

        if (!notestosend) return;
        const config = {
          data: { notes: notestosend, notesId, title: refTitle, userId },
          method: !notesId ? 'put' : 'patch',
          url,
        };

        const {
          data: { _id: newId },
        } = await axios(config);

        if (!notesId) setNotesId(newId);

        setError('');
        refetch();
      }
      if (timer) clearInterval(timer);
    } catch (err) {
      setError('Saving failed');
      console.log(err);
    }
  };

  const onChangeHandler = () => {
    if (timer) clearInterval(timer);
    timer = setInterval(() => saveHandler(null), 400);
  };

  const saveShortcut = (e) => {
    if ((window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) && e.keyCode === 83) {
      e.preventDefault();
      saveHandler(e, true);
    }
  };

  return (
    <div className={styles.editorContainer}>
      <input
        type="text"
        className={styles.error}
        defaultValue={error}
        readOnly
        style={{ display: error ? 'block' : 'none' }}
      />
      <input type="text" placeholder="Title" ref={inputRef} defaultValue={title} />
      <EditorJs
        {...editorOptions(notes)}
        instanceRef={(instance) => {
          editor.current = instance;
        }}
      >
        <div
          id="editorjs"
          className={styles.editor}
          onKeyDown={saveShortcut}
          onKeyUp={onChangeHandler}
        />
      </EditorJs>
      <Preview blocks={outputData?.blocks} />
    </div>
  );
}

Editor.propTypes = {
  id: PropTypes.string,

  isNew: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  notes: PropTypes.any,
  refetch: PropTypes.func.isRequired,
  title: PropTypes.string,
};

Editor.defaultProps = {
  id: null,
  isNew: false,
  notes: null,
  title: '',
};

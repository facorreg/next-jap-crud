/* eslint-disable react/button-has-type */
import axios from 'axios';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { AiFillDelete } from 'react-icons/ai';
import { GrDocumentUpdate } from 'react-icons/gr';

import useAuth from '@hooks/useAuth';
import styles from '@styles/notes.module.scss';
import { getEnv } from '@utils';

const EditorJS = dynamic(() => import('@components/Editor'), { ssr: false });
const defaultApiUrl = 'http://localhost:4000';
const apiEndPoint = getEnv('API_ENDPOINT', defaultApiUrl);

const url = `${getEnv('API_ENDPOINT', 'http://localhost:4000')}/delnotes`;

// use of put because axios does not support data on delete
const deleteNotes = async (userId, notesId, refetch) => {
  console.log(userId, notesId);
  try {
    await axios.request({
      data: { notesId, userId },
      method: 'put',
      url,
    });
    refetch();
  } catch (err) {
    console.log(err);
  }
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default function Home() {
  const [userNotes, setUserNotes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentlyOpen, setCurrentlyOpen] = useState(null);

  const { isAuthenticated, userId } = useAuth();
  if (!isAuthenticated) return <></>;

  const fetchNotes = async () => {
    const data = await axios(`${apiEndPoint}/notes/${userId}`).catch(() => {});

    setUserNotes(data?.data || []);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  let editorProps = {};

  if (currentlyOpen) {
    // eslint-disable-next-line no-underscore-dangle
    const { _id: id, notes, title } = userNotes.find((e) => e._id === currentlyOpen);
    editorProps = { id, notes, title };
  }

  return (
    <div className={styles.notesContainer}>
      {!isOpen && <button onClick={() => setIsOpen(true)}>Create note</button>}
      {isOpen && (
        <button
          onClick={() => {
            setIsOpen(false);
            setCurrentlyOpen(null);
            editorProps = {};
          }}
        >
          Close editor
        </button>
      )}
      {/* <div style={{ display: isOpen ? 'block' : 'none' }}> */}
      {isOpen && <EditorJS refetch={fetchNotes} {...editorProps} />}
      {/* </div> */}
      <table className={styles.notesList}>
        <thead>
          <tr>
            <th>Notes</th>
            <th className={styles.actions}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userNotes.map(({ _id: notesId, title }) => {
            return (
              <tr>
                <td>{title}</td>
                <td className={styles.actions}>
                  <div>
                    <IconContext.Provider
                      value={{
                        className: `${styles.icon} ${styles[isOpen ? 'grayColor' : 'invertColor']}`,
                        size: '1em',
                      }}
                    >
                      <GrDocumentUpdate
                        onClick={() => {
                          if (isOpen) return;
                          setCurrentlyOpen(notesId);
                          setIsOpen(true);
                        }}
                      />
                    </IconContext.Provider>
                    <IconContext.Provider
                      value={{
                        className: `${styles.icon} ${isOpen ? styles.grayColor : ''}`,
                        size: '1em',
                      }}
                    >
                      <AiFillDelete
                        onClick={() => {
                          if (isOpen) return;
                          deleteNotes(userId, notesId, fetchNotes);
                        }}
                      />
                    </IconContext.Provider>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

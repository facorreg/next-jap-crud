import { useAtom } from 'jotai';

import { openModalAtom, meAtom } from '@atoms';
import useAuth from '@hooks/useAuth';
import styles from '@styles/Header.module.scss';

import MultiLanguageButton from './MutliLanguageButton';

const Header = () => {
  const [, openModal] = useAtom(openModalAtom);
  const [, setMe] = useAtom(meAtom);
  const openModalHandler = (modalName) => () => openModal({ modalName });
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.header}>
      {!isAuthenticated ? (
        <div className={styles.menu}>
          <MultiLanguageButton
            en="LOGIN"
            jp="サインイン"
            onClickHandler={openModalHandler('login')}
          />
          <MultiLanguageButton
            en="REGISTER"
            jp="サインアップ"
            onClickHandler={openModalHandler('register')}
          />
        </div>
      ) : (
        <div className={styles.menu}>
          <MultiLanguageButton
            className={styles.menuButton}
            en="LOGOUT"
            jp="サインアウト"
            onClickHandler={() => setMe()}
          />
        </div>
      )}
    </div>
  );
};

export default Header;

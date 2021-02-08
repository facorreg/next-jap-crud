import { useAtom } from 'jotai';

import { openModalAtom } from '@atoms';
import styles from '@styles/Header.module.scss';

import MultiLanguageButton from './MutliLanguageButton';

const Header = () => {
  const [, openModal] = useAtom(openModalAtom);
  const openModalHandler = (modalName) => () => openModal({ modalName });
  const isAuthenticated = false;

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
          <MultiLanguageButton className={styles.menuButton} en="LOGOUT" jp="サインアウト" />
        </div>
      )}
    </div>
  );
};

export default Header;

/* eslint-disable import/no-cycle */
import { atom } from 'jotai';

import ForgotForm from '@components/Forgot.form';
import KanjiPage from '@components/KanjiDetails';
import LoginForm from '@components/Login.form';
import RegisterForm from '@components/Register.form';

const modals = {
  forgot: ForgotForm,
  kanji: KanjiPage,
  login: LoginForm,
  register: RegisterForm,
  // createDeck: CreateDeck,
  // createCard: CreateCard,
  // dialog: Dialog,
};

const isOpenAtom = atom(false);
const modalAtom = atom(null);

const openModalAtom = atom(
  (get) => get(isOpenAtom),
  (_, set, { modalName, props = {} }) => {
    const { [modalName]: Component } = modals;
    set(isOpenAtom, true);
    return set(modalAtom, <Component {...props} />);
  },
);

const closeModalAtom = atom(
  (get) => get(isOpenAtom),
  (_, set) => {
    set(isOpenAtom, false);
    set(modalAtom, null);
    return null;
  },
);

export { openModalAtom, closeModalAtom, isOpenAtom, modalAtom };

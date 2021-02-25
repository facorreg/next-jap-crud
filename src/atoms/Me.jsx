import { atom } from 'jotai';
import Cookies from 'js-cookie';

const getAsJSON = () => {
  const cookieSTR = Cookies.get('me');
  if (!cookieSTR) return null;

  return JSON.parse(cookieSTR);
};
const me = atom(getAsJSON());

const persistAtom = atom(
  (get) => get(me),
  (_, set, action) => {
    const newMe = action;
    if (!newMe) Cookies.remove('me');
    else Cookies.set('me', JSON.stringify(newMe));
    set(me, newMe);

    // await localStorage?.setItem(me, newMe);
    return newMe;
  },
);

persistAtom.onMount = (dispatch) => {
  dispatch({ type: 'init' });
};

// eslint-disable-next-line import/prefer-default-export
export { persistAtom as meAtom };

import * as api from '../api';

export const signin = (form, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signin(form);

    dispatch({ type:'AUTH', data });

    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (form, router) => async (dispatch) => {
  try {
     const { data } = await api.signup(form);

     dispatch({ type: "AUTH" , data });

    router('/');
  } catch (error) {
    console.log(error);
  }
};
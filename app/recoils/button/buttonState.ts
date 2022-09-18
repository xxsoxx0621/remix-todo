import {atom, atomFamily} from "recoil";

export const buttonState = atom({
    key: 'buttonState',
    default: false,
});

export const submitButtonState = atom({
    key: 'submitButtonState',
    default: false,
});

export const todoListState = atom({
    key: 'todoListState',
    default: [],
});

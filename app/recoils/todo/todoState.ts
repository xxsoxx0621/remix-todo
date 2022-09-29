import {atom, selector} from "recoil";
import _ from "lodash";


export interface ItemProps {
    id: number,
    text: string,
    checked: boolean,
}

export const buttonState = atom({
    key: 'buttonState',
    default: false,
});

export const submitButtonState = atom({
    key: 'submitButtonState',
    default: false,
});

export const todoListState = atom<Array<ItemProps>>({
    key: 'todoList',
    default: [],
});

export const todoListSelector = selector<Array<ItemProps>>({
    key: 'todoListSelector',
    get: ({get}) => {
        const todoList = get(todoListState);
        const finished = todoList.filter((item) => _.isEqual(item.checked,true));
        return finished;
    }
})
import styled, {createGlobalStyle, css} from "styled-components";
import {useEffect, useState} from "react";
import _ from "lodash";
import {MdAddCircleOutline} from "@react-icons/all-files/md/MdAddCircleOutline";
import {TiDeleteOutline} from "@react-icons/all-files/ti/TiDeleteOutline";
import moment from "moment";
import TodoTitle from "~/components/TodoTitle";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {buttonState, submitButtonState, todoListState} from "~/recoils/button/buttonState";
import TodoInputField from "~/components/TodoInputField";
import {RiDeleteBin6Fill} from "@react-icons/all-files/ri/RiDeleteBin6Fill";

export interface ItemProps {
    id: number,
    text: string,
    checked: boolean,
}


export default function Index() {

    // id값으로 라우팅되면 해당 페이지의 상세?
    const [index, setIndex] = useState<number>(0);
    const show = useRecoilValue(buttonState);
    const [addTodo, setAddTodo] = useRecoilState(submitButtonState);
    const setTodoList = useSetRecoilState(todoListState);

    const [todoItem, setTodoItem] = useState<ItemProps>({
        id: index,
        text: "",
        checked: false,
    });

    const [list, setList] = useState<Array<ItemProps>>([]);

    const onChangeText = (item: ItemProps) => {
        setTodoItem(item);
    };

    const onCheckedTodo = (e: any) => {
        setList(
            list.map((item) =>
                _.isEqual(_.toString(item.id), e.target.value) ? {...item, checked: !item.checked} : item
            ))
    };

    const onDeleteTodo = (e: any) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            setList(list.filter((item) => !_.isEqual(_.toString(item.id), e.target.value)));
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (addTodo && !_.isEqual(todoItem.text, "")) {
            setList([...list, todoItem]);
            setIndex((prev: number) => prev + 1);
            setAddTodo(false);
        }
        setAddTodo(false);
    }, [addTodo]);

    console.log(list);
    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                <TodoContainer>
                    <TodoTitle count={list.length}/>
                    <TodoInputField index={index} onChange={onChangeText}/>
                    {
                        list.map((item, index) => (
                            <ToDoItem key={index}>
                                <input type="checkbox" value={item.id} defaultChecked={item.checked}
                                       onChange={onCheckedTodo}/>
                                <div className={item.checked ? 'checked' : 'unchecked'}>{item.text}</div>
                                <label>
                                    <RiDeleteBin6Fill/>
                                    <input type="button" value={item.id} id={`deleteBtn`} hidden={true}
                                           onClick={onDeleteTodo}/>
                                </label>

                            </ToDoItem>
                        ))
                    }
                </TodoContainer>
            </Wrapper>
        </>
    );
}

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #50586C;
  }
`;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoContainer = styled.div`
  background: #DCE2F0;
  border: 1px solid #DCE2F0;
  border-radius: 8px;
  box-shadow: 4px 3px 3px 3px;
  width: 50%;
  height: auto;
  text-align: center;
  padding: 10px;
  overflow:auto;
`;


const ToDoItem = styled.div`
  width: 100%;
  height: 30px;
  border-bottom: 1px solid #50586C;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
    &.checked {
      color: #9ca3af;
      text-decoration: line-through;
    }

    &.unchecked {
      color: #000000;
    }
  }
`;

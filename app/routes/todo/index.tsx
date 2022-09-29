import {Outlet, useLoaderData, useParams} from "@remix-run/react";
import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import _ from "lodash";
import TodoTitle from "~/components/TodoTitle";
import {useRecoilState, useRecoilValue} from "recoil";
import TodoInputField from "~/components/TodoInputField";
import {RiDeleteBin6Fill} from "@react-icons/all-files/ri/RiDeleteBin6Fill";
import {Link} from "@remix-run/react";
import {buttonState, submitButtonState, todoListSelector, todoListState} from "~/recoils/todo/todoState";
import TodoList from "~/components/TodoList";
import {ActionFunction, json, LoaderFunction, redirect} from "@remix-run/node";

export interface ItemProps {
    id: number,
    text: string,
    checked: boolean,
}


export const action: ActionFunction = async ({request}) => {
    const body = await request.formData();
    const todo = await body.get('text');
    return redirect(`/todo`);
};


export default function Todo() {

    const [index, setIndex] = useState<number>(1);
    const show = useRecoilValue(buttonState);
    const [addTodo, setAddTodo] = useRecoilState(submitButtonState);
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [todoItem, setTodoItem] = useState<ItemProps>({
        id: index,
        text: "",
        checked: false,
    });

    const onChangeText = (item: ItemProps) => {
        setTodoItem(item);
    };


    useEffect(() => {
        if (addTodo && !_.isEqual(todoItem.text, "")) {
            setTodoList([...todoList, todoItem]);
            setIndex((prev: number) => prev + 1);
            setAddTodo(false);
        }
        setAddTodo(false);
    }, [addTodo]);


    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                <Outlet/>
                <TodoContainer>
                    <TodoTitle count={todoList.length}/>
                    <TodoInputField index={index} onChange={onChangeText}/>
                    {
                        todoList.length > 0 ? <TodoList/> : <EmptyItem>내용이 없습니다.</EmptyItem>
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
  width: 40%;
  height: 500px;
  text-align: center;
  padding: 10px;
  overflow: auto;
`;


const EmptyItem = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;





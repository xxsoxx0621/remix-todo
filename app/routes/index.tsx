import styled, {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import _ from "lodash";
import TodoTitle from "~/components/TodoTitle";
import {useRecoilState, useRecoilValue} from "recoil";
import TodoInputField from "~/components/TodoInputField";
import {RiDeleteBin6Fill} from "@react-icons/all-files/ri/RiDeleteBin6Fill";
import {Link} from "@remix-run/react";
import {buttonState, submitButtonState, todoListSelector, todoListState} from "~/recoils/todo/state";

export interface ItemProps {
    id: number,
    text: string,
    checked: boolean,
}


export default function Index() {

    const [index, setIndex] = useState<number>(1);
    const show = useRecoilValue(buttonState);
    const [addTodo, setAddTodo] = useRecoilState(submitButtonState);
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [displayTodoList, setDisplayTodoList] = useState<Array<ItemProps>>(todoList);
    const finishedList = useRecoilValue(todoListSelector);
    const [todoItem, setTodoItem] = useState<ItemProps>({
        id: index,
        text: "",
        checked: false,
    });

    const onChangeText = (item: ItemProps) => {
        setTodoItem(item);
    };

    const onCheckedTodo = (e: any) => {
        setTodoList(
            todoList.map((item) =>
                _.isEqual(_.toString(item.id), e.target.value) ? {...item, checked: !item.checked} : item
            ));
    };

    const onDeleteTodo = (e: any) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            setTodoList(todoList.filter((item) => !_.isEqual(_.toString(item.id), e.target.value)));
        } else {
            return false;
        }
    };

    const onClickTotalList = () => {
        setDisplayTodoList(todoList);
    };

    const onClickFinishList = () => {
        finishedList.length > 0 ? setDisplayTodoList(finishedList) : setDisplayTodoList(todoList);
    };

    useEffect(() => {
        if (addTodo && !_.isEqual(todoItem.text, "")) {
            setTodoList([...todoList, todoItem]);
            setIndex((prev: number) => prev + 1);
            setAddTodo(false);
        }
        setAddTodo(false);
    }, [addTodo]);

    useEffect(() => {
        setDisplayTodoList(todoList);
    }, [todoList]);

    
    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                <TodoContainer>
                    <TodoTitle count={todoList.length}/>
                    <TodoInputField index={index} onChange={onChangeText}/>
                    {
                        displayTodoList.length > 0 ?
                            <>
                                {
                                    displayTodoList.map((item, index) => (
                                        <ToDoItem key={item.id}>
                                            <input type="checkbox" value={item.id} defaultChecked={item.checked}
                                                   onChange={onCheckedTodo}/>
                                            <div className={item.checked ? 'checked' : 'unchecked'}>
                                                <Link to={`/todo/${item.id}`} state={{data: item.id}}
                                                      style={{textDecoration: "none", color: "#000000"}}>
                                                    {item.text}
                                                </Link>
                                            </div>
                                            <label>
                                                <RiDeleteBin6Fill/>
                                                <input type="button" value={item.id} id={`deleteBtn`} hidden={true}
                                                       onClick={onDeleteTodo}/>
                                            </label>
                                        </ToDoItem>
                                    ))
                                }
                                <ButtonContainer>
                                    <Buttons>
                                        <div>
                                            <input type="button" onClick={onClickTotalList} value="전체목록"/>
                                        </div>
                                        <div>
                                            <input type="button" onClick={onClickFinishList} value="완료목록"/>
                                        </div>
                                    </Buttons>
                                </ButtonContainer>
                            </>
                            :
                            <EmptyItem>내용이 없습니다.</EmptyItem>
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

const EmptyItem = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-top: 30px;
`;

const Buttons = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;

  & > div > input[type=button]:nth-child(1) {
    border: none;
    background: none;
  }
`;

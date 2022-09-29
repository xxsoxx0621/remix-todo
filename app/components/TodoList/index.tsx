import {RiDeleteBin6Fill} from "@react-icons/all-files/ri/RiDeleteBin6Fill";
import {Link} from "@remix-run/react";
import _ from "lodash";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import styled from "styled-components";
import {ItemProps, todoListSelector, todoListState} from "~/recoils/todo/todoState";

const TodoList = () => {
    const [todoList, setTodoList] = useRecoilState(todoListState);
    const [displayTodoList, setDisplayTodoList] = useState<Array<ItemProps>>(todoList);
    const finishedList = useRecoilValue(todoListSelector);


    const onClickTotalList = () => {
        setDisplayTodoList(todoList);
    };


    const onClickFinishList = () => {
        finishedList.length > 0 ? setDisplayTodoList(finishedList) : setDisplayTodoList(todoList);
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

    useEffect(() => {
        setDisplayTodoList(todoList);
    }, [todoList]);


    return (
        <>
            {
                displayTodoList.map((item, index) => (
                    <div>
                        <ToDoItem key={item.id}>
                            <input type="checkbox"
                                   value={item.id}
                                   checked={item.checked}
                                   onChange={onCheckedTodo}/>
                            <div className={item.checked ? 'checked' : 'unchecked'}>
                                <Link to={`/todo/${item.id}`} state={{data: item.id}}>
                                    {item.text}
                                </Link>
                            </div>
                            <label>
                                <RiDeleteBin6Fill/>
                                <input type="button" value={item.id} id={`deleteBtn`} hidden={true}
                                       onClick={onDeleteTodo}/>
                            </label>
                        </ToDoItem>
                    </div>
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

    );
};

export default TodoList;


const ToDoItem = styled.div`
  width: 100%;
  height: auto;
  border-bottom: 1px solid #50586C;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > div {
   

    &.checked {
      & > a {
        color: #9ca3af;
        text-decoration-color: #9ca3af;
        text-decoration: line-through;
      }
    }

    &.unchecked {
      & > a {
        color: #000000;
        text-decoration: none;
      }
    }
  }
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

import {Link, useLoaderData, useLocation, useNavigate} from "@remix-run/react";
import _ from "lodash";
import styled, {createGlobalStyle} from "styled-components";
import {RiDeleteBin6Fill} from "@react-icons/all-files/ri/RiDeleteBin6Fill";
import {useRecoilState} from "recoil";
import {ItemProps, todoListState} from "~/recoils/todo/state";
import {
    useEffect, useState
} from "../../../../../../../../Applications/IntelliJ IDEA.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";


export const TodoListDetail = () => {
    const navi = useNavigate();
    const location = useLocation();
    const todoId = _.get(location.state, 'data');
    const [todoList, setTodoList] = useRecoilState(todoListState);


    const onCheckedTodo = (e: any) => {
        setTodoList(
            todoList.map((item) =>
                _.isEqual(_.toString(item.id), e.target.value) ? {...item, checked: !item.checked} : item
            ));
    };

    const onDeleteTodo = (e: any) => {
        if (window.confirm('삭제 하시겠습니까?')) {
            setTodoList(todoList.filter((item) => !_.isEqual(_.toString(item.id), e.target.value)));
            navi('/');
        } else {
            return false;
        }
    };

    const findTarget = () => {
        const filtered = todoList.filter((item) => _.isEqual(item.id, todoId));
        return filtered;
    };

    return (
        <>
            <GlobalStyle/>
            <Wrapper>
                {
                    findTarget().map((item) => (
                        <TodoContainer key={item.id}>
                            <div>{item.id}번째 Todo</div>
                            <ToDoItem>
                                <input type="checkbox"
                                       value={item.id}
                                       checked={item.checked}
                                       onChange={onCheckedTodo}/>
                                <div className={item.checked ? 'checked' : 'unchecked'}>
                                    {item.text}
                                </div>
                                <label>
                                    <RiDeleteBin6Fill/>
                                    <input type="button" value={item.id} id={`deleteBtn`} hidden={true}
                                           onClick={onDeleteTodo}/>
                                </label>
                            </ToDoItem>
                            <div>
                                <Link to={`/`}>홈으로</Link>
                            </div>
                        </TodoContainer>
                    ))
                }
            </Wrapper>

        </>
    )
}

export default TodoListDetail;

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
  overflow: auto;

  & > div:first-child {
    font-size: 16px;
    font-weight: 700;
    padding-bottom: 30px;
  }

  & > div:last-child {
    padding-top: 30px;
  }
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


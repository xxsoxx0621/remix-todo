import {createGlobalStyle} from "styled-components";
import {useEffect, useState} from "react";
import _ from "lodash";

interface InputForm {
    id: number,
    text: string,
}

interface Props {
    list: Array<object>
}

export default function Index() {

    // id값으로 라우팅되면 해당 페이지의 상세?

    const [index, setIndex] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const [todo, setTodo] = useState<string>("");
    const [list, setList] = useState<Array<object>>([]);
   
    const onEditButtonClick = (e: any) => {
        if (_.isEqual(e.target.value, "reset")) {
            setShow(!show);
            setTodo("");
        } else {
            setShow(!show);
        }
    };

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        setList([...list, {id: index, text: todo}]);
        setIndex((prev: number) => prev + 1);
    };

    console.log([...list, {id: 0, text: todo}]);
    const onChangeText = (e: any) => {
        setTodo(e.target.value);
    };

    const onResetTodo = (e: any) => {

    };


    const TodoList = ({list}: Props) => {
        return (
            <>
                {
                    _.gt(list, 0)
                        ? <>
                            {
                                list.map((item) => (
                                    <>
                                        <div>{item.text}</div>
                                    </>
                                ))
                            }
                        </>
                        :
                        <div>리스트가 없습니다.</div>
                }
            </>
        )
    }
    return (
        <>
            <GlobalStyle/>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <div style={{border: "1px solid black", width: "50%", height: "auto", textAlign: "center"}}>
                    <h1>TODO</h1>
                    <TodoList list={list}/>
                    <div hidden={!show}>
                        <div>
                            <input type="text" value={todo} placeholder="할 일을 입력해주세요." onChange={onChangeText}/>
                        </div>
                    </div>
                    <div>
                        <input type="button" value={show ? "reset" : "create"} onClick={onEditButtonClick}/>
                        <input type="button" value="submit" hidden={!show} onClick={onSubmitForm}/>
                    </div>
                </div>
            </div>
        </>
    );
}

//todo : 추후 색상 정하기
const GlobalStyle = createGlobalStyle`
                        body {

                    }
                        `;
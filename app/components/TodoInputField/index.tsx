import {useRecoilState, useRecoilValue} from "recoil";
import {ItemProps} from "~/routes";
import {useEffect, useState} from "react";
import styled, {css} from "styled-components";
import {TiDeleteOutline} from "@react-icons/all-files/ti/TiDeleteOutline";
import {buttonState, submitButtonState} from "~/recoils/todo/state";
import {
    KeyboardEvent
} from "../../../../../../../../Applications/IntelliJ IDEA.app/Contents/plugins/JavaScriptLanguage/jsLanguageServicesImpl/external/react";
import _ from "lodash";

interface Props {
    index: number,
    onChange: (item: ItemProps) => void,

}

const TodoInputField = ({onChange, index}: Props) => {
    const [show, setShow] = useRecoilState(buttonState);
    const addTodo = useRecoilValue(submitButtonState);

    const [todoItem, setTodoItem] = useState<ItemProps>({
        id: index,
        text: "",
        checked: false,
    });

    const onChangeText = (e: any) => {
        setTodoItem({...todoItem, id: index, text: e.target.value});
    };

    const onCancelButtonClick = () => {
        setShow(!show);
        setTodoItem({...todoItem, text: ""});
    };

    useEffect(() => {
        onChange(todoItem);
    }, [todoItem]);

    useEffect(() => {
        addTodo && setTodoItem({...todoItem, text: ""});
    }, [addTodo]);

    return (
        <Wrapper hidden={!show}>
            <InputField type="text" value={todoItem.text} placeholder="할 일을 입력해주세요."
                        onChange={onChangeText}/>
            <label htmlFor={'cancelBtn'} onClick={onCancelButtonClick}>
                <TiDeleteOutline/>
            </label>
            <input type="button" id={`cancelBtn`} hidden={true}/>
        </Wrapper>
    )
};

export default TodoInputField;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #50586C;
  ${props =>
          props.hidden &&
          css`
            display: none;
          `}
`;

const InputField = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  background: #DCE2F0;

  &:focus-visible {
    outline: none;
  }
`;
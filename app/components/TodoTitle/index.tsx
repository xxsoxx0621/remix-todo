import moment from "moment/moment";
import styled from "styled-components";
import {MdAddCircleOutline} from "@react-icons/all-files/md/MdAddCircleOutline";
import {useRecoilState, useSetRecoilState} from "recoil";
import {buttonState, submitButtonState} from "~/recoils/button/buttonState";
import {BsCheckCircle} from "@react-icons/all-files/bs/BsCheckCircle";

interface Props {
    count: number,
}

export default function TodoTitle({count}: Props) {
    const setAddTodo = useSetRecoilState(submitButtonState);
    const [changeShow, setChangeShow] = useRecoilState(buttonState);

    const onAddTodoItem = () => setAddTodo(true);
    const onEditButtonClick = () => setChangeShow(!changeShow);


    return (
        <Wrapper>
            <div>
                <div>{moment().format('ll')}</div>
                <div>{count} tasks</div>
            </div>
            <div>
                <label htmlFor={`editBtn`} hidden={changeShow}>
                    <MdAddCircleOutline/>
                </label>
                <input type="button" id={`editBtn`} hidden={true} onClick={onEditButtonClick}/>
                <label htmlFor={`addBtn`} hidden={!changeShow}>
                    <BsCheckCircle/>
                </label>
                <input type="button" id={`addBtn`} hidden={true} onClick={onAddTodoItem}/>
            </div>
        </Wrapper>
    )
}
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > div:first-child {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    & > div:first-child {
      font-size: 20px;
      font-weight: 700;
    }
  }
`;
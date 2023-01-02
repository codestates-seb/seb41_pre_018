import styled from 'styled-components';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { deleteUserThunk } from '../module/thunkModule';
import { loginBoolean } from '../module/loginBooleanSlice';
const Modal_Container = styled.div`
  height: 450px;
  width: 800px;
  background-color: white;
  position: absolute;
  top: 150px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 1px 1px 20px 1px #b3d3ea;
`;
const Modal_Head_Container = styled.div`
  display: flex;
  flex-direction: column;
  * {
    margin: 10px 0px;
  }
`;
const Modal_Title = styled.span`
  font-size: 28px;
  font-weight: bold;
`;
const Modal_Hr = styled.hr`
  width: 800px;
  background-color: black;
`;
const Modal_Content = styled.span`
  font-size: 15px;
`;
const Modal_List_Box = styled.ul``;
const Modal_Tail_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Modal_Check_Box = styled.div`
  display: flex;
  align-items: center;
  & > span {
    font-weight: 600;
    color: #fe2e2e;
  }
  & > input {
    width: 25px;
    height: 25px;
    margin-right: 10px;
  }
`;
const Modal_Button_Box = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
  * {
    margin: 0 20px;
  }
`;
const Modal_DeleteUser_Button = styled.button`
  height: 30px;
  width: 100px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #fe2e2e;
  color: #3973b3;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    background-color: #f78181;
  }
  &:disabled:hover {
    cursor: auto;
  }
`;
const Modal_Cancel_Button = styled.button`
  height: 30px;
  width: 100px;
  border: 1px solid #7aa7c7;
  border-radius: 5px;
  background-color: #e1ecf4;
  color: #3973b3;
  &:hover {
    background-color: #b3d3ea;
    cursor: pointer;
  }
`;
function DeleteUserModal({ deleteUserHandle }) {
  const [checked, setChecked] = useState(false);
  const { memberId } = useSelector((state) => state.loginBoolean);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const checkHandle = (e) => {
    setChecked(e.target.checked);
  };

  const deleteUserFunction = useCallback(() => {
    dispatch(deleteUserThunk({ cookie: cookies.access_token, memberId })).then(
      (data) => {
        if (data.payload !== false) {
          if (data.payload !== 204) {
            alert('준비 중 입니다.');
          } else {
            removeCookie('access_token');
            dispatch(loginBoolean({ isLogin: false, memberId: '' }));
            navigate('/deleteuser-completed');
          }
        } else {
          return data.payload;
        }
      }
    );
  }, [dispatch]);
  return (
    <Modal_Container>
      <Modal_Head_Container>
        <Modal_Title>Delete Profile</Modal_Title>
        <Modal_Hr />
        <Modal_Content>
          Before confirming that you would like your profile deleted, we'd like
          to take a moment to explain the implications of deletion:
        </Modal_Content>
        <Modal_List_Box>
          <li>
            Deletion is irreversible, and you will have no way to regain any of
            your original content, should this deletion be carried out and you
            change your mind later on.
          </li>
          <li>
            Your questions and answers will remain on the site, but will be
            disassociated and anonymized (the author will be listed as
            "user20819438") and will not indicate your authorship even if you
            later return to the site.
          </li>
        </Modal_List_Box>
        <Modal_Content>
          Confirming deletion will only delete your profile on Stack Overflow -
          it will not affect any of your other profiles on the Stack Exchange
          network. If you want to delete multiple profiles, you'll need to visit
          each site separately and request deletion of those individual
          profiles.
        </Modal_Content>
      </Modal_Head_Container>
      <Modal_Tail_Container>
        <Modal_Check_Box>
          <input type="checkbox" onClick={checkHandle} />
          <span>
            I have read the information stated above and understand the
            implications of having my profile deleted. I wish to proceed with
            the deletion of my profile.
          </span>
        </Modal_Check_Box>
        <Modal_Button_Box>
          <Modal_Cancel_Button onClick={() => deleteUserHandle(false)}>
            Cancel
          </Modal_Cancel_Button>
          <Modal_DeleteUser_Button
            disabled={checked === true ? false : true}
            onClick={deleteUserFunction}
          >
            Delete profile
          </Modal_DeleteUser_Button>
        </Modal_Button_Box>
      </Modal_Tail_Container>
    </Modal_Container>
  );
}
export default DeleteUserModal;

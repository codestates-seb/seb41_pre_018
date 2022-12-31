import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//질문 투표 및 답변 투표는 보류 상태

//회원 가입
export const signinThunk = createAsyncThunk(
  'thunkModule/signinThunk',
  async (data) => {
    const { username, email, password } = data;
    try {
      await axios
        .post(
          'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members',
          {
            username,
            email,
            password,
          }
        )
        .then((data) => data);
    } catch (e) {
      console.error(e);
    }
  }
);

//로그인
export const loginThunk = createAsyncThunk(
  'thunkModule/loginThunk',
  async (data) => {
    const { email, password } = data;
    try {
      const response = await axios
        .post(
          'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/login',
          { email, password }
        )
        .then((data) => [data.headers.authorization, data.data.memberId]);
      return response;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
);
//로그아웃? api 필요한가?
export const logoutThunk = createAsyncThunk(
  'thunkModule/logoutThunk',
  async () => {
    try {
      await axios.post(
        'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/logout'
      );
    } catch (e) {
      console.error(e);
    }
  }
);

//전체 질문 조회 페이지
export const getAllQuestionsThunk = createAsyncThunk(
  'thunkModule/getAllQuestionsThunk',
  async (data) => {
    const { page, size, sortingMethod } = data;
    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions?page=${page}&size=${size}&sort=${sortingMethod}`
        )
        .then((result) => {
          return result.data.data;
        });

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//회원 정보 조회
export const getUserInfoThunk = createAsyncThunk(
  'thunkModule/getUserInfoThunk',
  async (data) => {
    const { cookie, memberId } = data;

    try {
      await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => console.log(data));
    } catch (e) {
      console.error(e);
    }
  }
);
//회원 탈퇴
export const deleteUserThunk = createAsyncThunk(
  'thunkModule/deleteUserThunk',
  async (data) => {
    const { memberId } = data;
    try {
      await axios.delete(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/member/${memberId}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//회원 정보 수정
export const patchUserThunk = createAsyncThunk(
  'thunkModule/patchUserThunk',
  async (data) => {
    const { memberId, username, aboutMe, email, password } = data;
    try {
      await axios.patch(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/member/${memberId}`,
        {
          username,
          aboutMe,
          email,
          password,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);

//질문 상세 페이지
export const getQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const { questionId } = data;
    try {
      await axios.get(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);

//질문 등록
export const postQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const { title, text, tags } = data;
    try {
      await axios.post(
        'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions',
        {
          title,
          text,
          tags,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//질문 검색
export const getSearchQuestionThunk = createAsyncThunk(
  'thunkModule/getSearchQuestionThunk',
  async (data) => {
    const { page, size, questionId, keyword } = data;
    try {
      await axios.get(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/search?page=${page}&size=${size}&sort=${questionId}&keyword=${keyword}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//질문 삭제
// export const delteQuestionThunk = createAsyncThunk(
//   'thunkModule/deleteQuestionThunk',
//   async (data) => {
//     const { questionId } = data;
//     try {
//       await axios.delete(`http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );
//질문 수정
export const patchQuestionThunk = createAsyncThunk(
  'thunkModule/patchQuestionThunk',
  async (data) => {
    const { questionId, title, text, tags } = data;
    try {
      await axios.patch(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`,
        {
          title,
          text,
          tags,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 등록
export const postAnswerThunk = createAsyncThunk(
  'thunkModule/postAnswerThunk',
  async (data) => {
    const { questionId, text } = data;
    try {
      await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}`,
        { text }
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 조회
export const getAnswerThunk = createAsyncThunk(
  'thunkModule/getAnswerThunk',
  async (data) => {
    const { questionId, answerId } = data;
    try {
      await axios.get(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}/${answerId}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 수정
export const patchAnswerThunk = createAsyncThunk(
  'thunkModule/patchAnswerThunk',
  async (data) => {
    const { questionId, answerId, text } = data;
    try {
      await axios.patch(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}/${answerId}`,
        { text }
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 삭제
export const deleteAnswerThunk = createAsyncThunk(
  'thunkModule/deleteAnswerThunk',
  async (data) => {
    const { answerId } = data;
    try {
      await axios.delete(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${answerId}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//댓글 등록
export const postCommentThunk = createAsyncThunk(
  'thunkModule/postCommentThunk',
  async (data) => {
    const { questionId, text } = data;
    try {
      await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}`,
        {
          text,
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);
//댓글 수정
export const patchCommentThunk = createAsyncThunk(
  'thunkModule/patchCommentThunk',
  async (data) => {
    const { questionId, commentId, text } = data;
    try {
    } catch (e) {
      console.error(e);
    }
    await axios.patch(
      `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}/${commentId}`,
      { text }
    );
  }
);
//댓글 삭제
export const deleteCommentThunk = createAsyncThunk(
  'thunkModule/deleteCommentThunk',
  async (data) => {
    const { questionId, commentId } = data;
    try {
      await axios.delete(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}/${commentId}`
      );
    } catch (e) {
      console.error(e);
    }
  }
);
////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////////////
// useCallback(() => {
//   if (isLogin === false) {
//     dispatch(isLoginThunk()); // 모든 페이지 렌더링 시작 시 함수 실행
//   }
// }, [dispatch]);

// useCallback(() => {
//   if (isLogin === true) {
//     dispatch(isLoginThunk()); // 모든 페이지 렌더링 시작 시 함수 실행
//   }
// }, [dispatch]);
//로그인 필요한 페이지에서 쿠키가 없거나 만료가 되어 응답이 올바르게 오지 않는다면 로그인 창으로 연결해야할것.

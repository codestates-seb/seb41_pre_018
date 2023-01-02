import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//질문 투표 및 답변 투표는 보류 상태

//회원 가입
export const signinThunk = createAsyncThunk(
  'thunkModule/signinThunk',
  async (data) => {
    const { username, email, password } = data;

    try {
      const response = await axios
        .post(
          'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members',
          {
            email,
            username,
            password,
          }
        )
        .then((data) => data);

      return response;
    } catch (e) {
      return e.response.status;
    }
  }
);
export const emaillCheckThunk = createAsyncThunk(
  'thunkModule/emailCheckThunk',
  async (data) => {
    const { email } = data;

    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/emailCheck/${email}`
        )
        .then((data) => data.data);
      return response;
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
      const response = await axios
        .all([
          axios.get(
            `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          ),
          axios.get(
            `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}/Info`,
            {
              headers: {
                Authorization: `Bearer ${cookie}`,
              },
            }
          ),
        ])
        .then(
          axios.spread((res1, res2) => {
            const { createdTime, username, aboutMe } = res1.data;

            const { questions, answers } = res2.data.data;
            return { createdTime, username, aboutMe, questions, answers };
          })
        );
      // console.log(response);
      return response;
    } catch (e) {
      return false;
    }
  }
);
//회원 정보 수정 위한 회원 정보
export const getUserInfoEditThunk = createAsyncThunk(
  'thunkModule/getUserInfoEditThunk',
  async (data) => {
    const { cookie, memberId } = data;
    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data.data);

      return response;
    } catch (e) {
      return false;
    }
  }
);
//회원 탈퇴
export const deleteUserThunk = createAsyncThunk(
  'thunkModule/deleteUserThunk',
  async (data) => {
    const { cookie, memberId } = data;
    // console.log(data);
    try {
      const response = await axios
        .delete(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data.status);
      return response;
    } catch (e) {
      return;
    }
  }
);
//회원 정보 수정
export const patchUserThunk = createAsyncThunk(
  'thunkModule/patchUserThunk',
  async (data) => {
    const { cookie, memberId, username, aboutMe } = data;
    // console.log(data);
    try {
      const response = await axios
        .patch(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/members/${memberId}`,
          {
            username,
            aboutMe,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data.data);

      return response;
    } catch (e) {
      return false;
    }
  }
);

//질문 상세 페이지

//질문 등록
export const postQuestionThunk = createAsyncThunk(
  'thunkModule/postQuestionThunk',
  async (data) => {
    const { title, text, tags, cookie } = data;
    // console.log(data);
    try {
      const response = await axios
        .post(
          'http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions',
          {
            title,
            text,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data);
      // console.log(response);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//질문 검색
export const getSearchQuestionThunk = createAsyncThunk(
  'thunkModule/getSearchQuestionThunk',
  async (data) => {
    const { page, size, sortingMethod, searchElement } = data;
    try {
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/search?page=${page}&size=${size}&sort=${sortingMethod}&search=${searchElement}`
        )
        .then((data) => data.data.data);
      return response;
    } catch (e) {
      console.error(e);
    }
  }
);

//질문 삭제 => 현재 서버에서 불가능
// export const deleteQuestionThunk = createAsyncThunk(
//   'thunkModule/deleteQuestionThunk',
//   async (data) => {
//     const { questionId, cookie } = data;
//     try {
//       await axios.delete(`http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`, null, {
//         headers: {
//           Authorization: `Bearer ${cookie}`,
//         },
//       })
//       .then((data) => data);
//       console.log(response);
//     } catch (e) {
//       console.error(e);
//     }
//   }
// );

//질문 수정
export const patchQuestionThunk = createAsyncThunk(
  'thunkModule/patchQuestionThunk',
  async (data) => {
    const { questionId, title, text, tags, cookie } = data;
    try {
      const response = await axios
        .patch(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/questions/${questionId}`,
          {
            title,
            text,
            tags,
          },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data);
      return response;
    } catch (e) {
      return false;
    }
  }
);
//답변 등록
export const postAnswerThunk = createAsyncThunk(
  'thunkModule/postAnswerThunk',
  async (data) => {
    const { questionId, text, cookie } = data;
    try {
      const response = await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      return response;
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
      const response = await axios
        .get(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}/${answerId}`
        )
        .then((data) => data.data.data);

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 수정
export const patchAnswerThunk = createAsyncThunk(
  'thunkModule/patchAnswerThunk',
  async (data) => {
    const { questionId, answerId, text, cookie } = data;
    // console.log(data);
    try {
      const response = await axios
        .patch(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${questionId}/${answerId}`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => data.data.data);

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//답변 삭제
export const deleteAnswerThunk = createAsyncThunk(
  'thunkModule/deleteAnswerThunk',
  async (data) => {
    const { answerId, cookie } = data;
    console.log(data);
    try {
      const response = await axios.delete(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/answers/${answerId}`,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );

      return response;
    } catch (e) {
      return e.response.status;
    }
  }
);
//댓글 등록
export const postCommentThunk = createAsyncThunk(
  'thunkModule/postCommentThunk',
  async (data) => {
    const { questionId, text, cookie } = data;
    try {
      const response = await axios
        .post(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}`,
          { text },
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((res) => res.data.data);

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//댓글 수정
export const patchCommentThunk = createAsyncThunk(
  'thunkModule/patchCommentThunk',
  async (data) => {
    const { questionId, commentId, text, cookie } = data;
    try {
      const response = await axios.patch(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  }
);

//댓글 삭제
export const deleteCommentThunk = createAsyncThunk(
  'thunkModule/deleteCommentThunk',
  async (data) => {
    const { questionId, commentId, cookie } = data;
    try {
      const response = await axios
        .delete(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/comments/${questionId}/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((res) => res.data.data);

      return response;
    } catch (e) {
      console.error(e);
    }
  }
);
//질문 투표 업
export const postQuestionVoteUpThunk = createAsyncThunk(
  'thunkModule/postQuestionVoteUpThunk',
  async (data) => {
    const { questionId, memberId, cookie } = data;
    try {
      await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/vote/questions/${questionId}/${memberId}/up`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
    } catch (e) {
      return e.response.status;
    }
  }
);
//질문 투표 다운
export const postQuestionVoteDownThunk = createAsyncThunk(
  'thunkModule/postQuestionVoteDownThunk',
  async (data) => {
    const { questionId, memberId, cookie } = data;

    try {
      await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/vote/questions/${questionId}/${memberId}/down`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
    } catch (e) {
      return e.response.status;
    }
  }
);
//답변 투표 업
export const postAnswerVoteUpThunk = createAsyncThunk(
  'thunkModule/postAnswerVoteUpThunk',
  async (data) => {
    const { answerId, memberId, cookie } = data;
    console.log(data);
    try {
      await axios
        .post(
          `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/vote/answers/${answerId}/${memberId}/up`,
          null,
          {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }
        )
        .then((data) => console.log(data));
    } catch (e) {
      return e.response.status;
    }
  }
);
//답변 투표 다운
export const postAnswerVoteDownThunk = createAsyncThunk(
  'thunkModule/postAnswerVoteDownThunk',
  async (data) => {
    const { answerId, memberId, cookie } = data;

    try {
      await axios.post(
        `http://ec2-13-124-223-25.ap-northeast-2.compute.amazonaws.com/vote/answers/${answerId}/${memberId}/down`,
        null,
        {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        }
      );
    } catch (e) {
      return e.response.status;
    }
  }
);

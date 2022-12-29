package sebpre018.com.stackOverflowClone.answer.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPatchDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPostDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    default Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
        // Question Id 받아오기 + Text 받아오기
        Question question = new Question();
        question.setQuestionId(answerPostDto.getQuestionId());
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setVoteResult(0);
        answer.setText(answerPostDto.getText());

        return answer;
    }
    default Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
        Question question = new Question();
        question.setQuestionId(answerPatchDto.getQuestionId());
        Answer answer = new Answer();
        answer.setQuestion(question);
        answer.setText(answerPatchDto.getText());

        return answer;
    }

    default AnswerResponseDto answerToAnswerResponse(Answer answer) {
        Member member = answer.getMember();  // 토큰으로 받아오는 정보라면 빼야함
        Question question = answer.getQuestion();
//         Question Id 를 받아와야함

        return AnswerResponseDto.builder()
                .answerId(answer.getAnswerId())
                .memberId(member.getId())
                .questionId(question.getQuestionId())
                .voteResult(answer.getVoteResult())
                .text(answer.getText())
                .createdAt(answer.getCreatedTime())
                .modifiedAt(answer.getModifiedTime())
                .build();
    }
    AnswerDto.Response answerToAnswerResponseDto(Answer answer);
    List<AnswerDto.Response> answersToAnswerResponseDtos(List<Answer> answers);

//    public Answer answerPostDtoToAnswer(AnswerPostDto answerPostDto) {
//        return new Answer(0L,
//                answerPostDto.getMemberId(),
//                answerPostDto.getQuestionId(),
//                answerPostDto.getText());
//    }
//
//    public Answer answerPatchDtoToAnswer(AnswerPatchDto answerPatchDto) {
//        return new Answer(answerPatchDto.getAnswerId(),
//                answerPatchDto.getMemberId(),
//                answerPatchDto.getQuestionId(),
//                answerPatchDto.getText());
//    }
//
//    public answerResponseDto answerToAnswerResponseDto(Answer answer) {
//        return new AnswerResponseDto(answer.getAnswerId(),
//                answer.getMember(),
//                answer.getQuestion(),
//                answer.getText());
//    }
}

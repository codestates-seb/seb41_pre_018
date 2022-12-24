package sebpre018.com.stackOverflowClone.answer.mapper;

import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPatchDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPostDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    Answer answerPostDtoToAnswer(AnswerDto.Post requestBody);
    Answer answerPatchDtoToAnswer(AnswerDto.Patch requestBody);
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

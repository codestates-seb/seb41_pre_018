package sebpre018.com.stackOverflowClone.question.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPatchDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPostDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionResponseDto;
import sebpre018.com.stackOverflowClone.question.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto);

    //default
    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);
//    {
//        Question question = new Question();
//
//        question.setTitle(questionPostDto.getTitle());
//
//        question.setText(questionPostDto.getText());
//
//        return question;
//
//        // question의 member 세팅은 Login 기능을 완성한 후, questionService에서 세팅 예정
//}


    default QuestionResponseDto questionToQuestionResponse(Question question){
        Member member = question.getMember();

        return QuestionResponseDto.builder()
                .id(question.getId())
                .memberId(member.getId())
                .title(question.getTitle())
                .text(question.getText())
                .voteResult(question.getVoteResult())
                .views(question.getViews())
                .build();
    }
}

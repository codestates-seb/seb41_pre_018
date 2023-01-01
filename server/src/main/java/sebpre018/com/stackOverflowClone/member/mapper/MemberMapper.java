package sebpre018.com.stackOverflowClone.member.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.comment.repository.CommentRepository;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;


import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);
    //Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponseDto(Member member);
    //List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

    default MemberDto.AllResponse InfoResponse(Member member, QuestionRepository questionRepository, AnswerRepository answerRepository) {
        List<Question> questions = questionRepository.findAllByMemberId(member.getMemberId());
        List<Answer> answers = answerRepository.findAllByMemberId(member.getMemberId());
        MemberDto.AllResponse response = new MemberDto.AllResponse();
        response.setMemberId(member.getMemberId());
        response.setUsername(member.getUsername());
        response.setEmail(member.getEmail());
        response.setAboutMe(member.getAboutMe());
        response.setCreatedAt(member.getCreatedTime());
        response.setModifiedAt(member.getModifiedTime());
        response.setQuestions(questionToUserResponseDto(questions));
        response.setAnswers(answerToUserResponseDto(answers));

        return response;
    }
    default List<MemberDto.MemberQuestionResponseDto> questionToUserResponseDto(List<Question> questions) {
        return questions
                .stream()
                .map(question-> MemberDto.MemberQuestionResponseDto
                        .builder()
                        .questionId(question.getQuestionId())
                        .title(question.getTitle())
                        .build())
                .collect(Collectors.toList());
    }
    default List<MemberDto.MemberAnswerResponseDto> answerToUserResponseDto(List<Answer> answers) {
        return answers
                .stream()
                .map(answer-> MemberDto.MemberAnswerResponseDto
                        .builder()
                        .answerId(answer.getAnswerId())
                        .questionId(answer.getQuestion().getQuestionId())
                        .text(answer.getText())
                        .build())
                .collect(Collectors.toList());
    }
}
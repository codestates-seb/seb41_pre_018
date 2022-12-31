package sebpre018.com.stackOverflowClone.member.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;


import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);
    //Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    //MemberDto.Response memberToMemberResponseDto(Member member);
    //List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);

    default MemberDto.AllResponse InfoResponse(Member member) {
        MemberDto.AllResponse response = new MemberDto.AllResponse();
        response.setMemberId(member.getMemberId());
        response.setUsername(member.getUsername());
        response.setEmail(member.getEmail());
        response.setCreatedAt(member.getCreatedTime());
        response.setModifiedAt(member.getModifiedTime());
        response.setQuestions(questionToUserResponseDto(member.getQuestions()));
        response.setAnswers(answerToUserResponseDto(member.getAnswers()));

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
                        .text(answer.getText())
                        .build())
                .collect(Collectors.toList());
    }
}
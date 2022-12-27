package sebpre018.com.stackOverflowClone.question.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.Tag.dto.TagPostDto;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.dto.AllResponseDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPatchDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPostDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionResponseDto;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    default Question questionPatchDtoToQuestion(QuestionPatchDto questionPatchDto){
        Question question = new Question();

        question.setId(questionPatchDto.getId());
        List<Tag> tags = tagsDtosToTags(questionPatchDto.getTags(), question);

        question.setTags(tags);
        question.setText(questionPatchDto.getText());
        question.setTitle(questionPatchDto.getTitle());

        return question;
    }

    default Question questionPostDtoToQuestion(QuestionPostDto questionPostDto){
        Question question = new Question();

        question.setVoteResult(0);
        question.setViews(0);

        List<Tag> tags = tagsDtosToTags(questionPostDto.getTags(), question);

        question.setTags(tags);
        question.setTitle(questionPostDto.getTitle());
        question.setText(questionPostDto.getText());

        return question;
    }

    default List<Tag> tagsDtosToTags(List<TagPostDto> tagPostDtos, Question question){
        //tag 또한 변환해줘야함(dto -> entity)

        return tagPostDtos.stream().map(tagPostDto -> {
            Tag tag = new Tag();
            tag.addQuestion(question);
            tag.setHashTag(tagPostDto.getHashtag());
            return tag;
        }).collect(Collectors.toList());
    }


    default QuestionResponseDto questionToQuestionResponse(Question question){
        Member member = question.getMember();

        return QuestionResponseDto.builder()
                .id(question.getId())
                .memberId(member.getId())
                .title(question.getTitle())
                .text(question.getText())
                .voteResult(question.getVoteResult())
                .views(question.getViews())
                .tags(tagsToTagResponseDtos(question.getTags()))
                .build();
    }

    default List<TagResponseDto> tagsToTagResponseDtos(List<Tag> tags){
        // tag
        return tags.stream()
                .map(tag -> TagResponseDto.builder()
                        .hashTag(tag.getHashTag())
                        .id(tag.getId())
                        .questionId(tag.getQuestion().getId())
                        .build())
                .collect(Collectors.toList());
    }

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

    AllResponseDto questionToAllResponse(Question question){
        Member member = question.getMember();

        return AllResponseDto.builder()
                .id(question.getId())
                .memberId(member.getId())
                .title(question.getTitle())
                .text(question.getText())
                .voteResult(question.getVoteResult())
                .views(question.getViews())
                .tags(tagsToTagResponseDtos(question.getTags()))
                .answers(answersToAnswerResponseDtos(question.getAnswers()))
                .comments(commentsToCommentResponseDtos(question.getComments()))
                .build();
    }
}

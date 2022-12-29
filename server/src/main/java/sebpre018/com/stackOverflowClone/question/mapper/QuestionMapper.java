package sebpre018.com.stackOverflowClone.question.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.Tag.dto.TagPostDto;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.comment.dto.CommentResponseDto;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.comment.repository.CommentRepository;
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

        question.setQuestionId(questionPatchDto.getQuestionId());
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
            tag.setHashTag(tagPostDto.getHashTag());
            return tag;
        }).collect(Collectors.toList());
    }


    default QuestionResponseDto questionToQuestionResponse(Question question){
        Member member = question.getMember();

        return QuestionResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getId())
                .username(member.getUsername())
                .title(question.getTitle())
                .text(question.getText())
                .voteResult(question.getVoteResult())
                .views(question.getViews())
                .createdAt(question.getCreatedTime())
                .modifiedAt(question.getModifiedTime())
                .tags(tagsToTagResponseDtos(question.getTags()))
                .build();
    }

    default List<TagResponseDto> tagsToTagResponseDtos(List<Tag> tags){
        // tag
        return tags.stream()
                .map(tag -> TagResponseDto.builder()
                        .hashTag(tag.getHashTag())
                        .tagId(tag.getTagId())
                        .questionId(tag.getQuestion().getQuestionId())
                        .build())
                .collect(Collectors.toList());
    }

    List<QuestionResponseDto> questionsToQuestionResponseDtos(List<Question> questions);

    default List<AnswerResponseDto> answersToAnswerResponseDtos(List<Answer> answers){
        return answers.stream()
                .map(answer -> AnswerResponseDto.builder()
                        .answerId(answer.getAnswerId())
                        .questionId(answer.getQuestion().getQuestionId())
                        .memberId(answer.getMember().getId())
                        .createdAt(answer.getCreatedTime())
                        .modifiedAt(answer.getModifiedTime())
                        .text(answer.getText())
                        .build())
                .collect(Collectors.toList());
    }

    default List<CommentResponseDto> commentsToCommentResponseDtos(List<Comment> comments){
        return comments.stream()
                .map(comment -> CommentResponseDto.builder()
                        .commentId(comment.getId())
                        .questionId(comment.getQuestion().getQuestionId())
                        .memberId(comment.getMember().getId())
                        .createdAt(comment.getCreatedTime())
                        .modifiedAt(comment.getModifiedTime())
                        .text(comment.getText())
                        .build())
                .collect(Collectors.toList());
    }
    default AllResponseDto questionToAllResponse(Question question, AnswerRepository answerRepository, CommentRepository commentRepository){
        Member member = question.getMember();
        List<Answer> answers = answerRepository.findAllByQuestionId(question.getQuestionId());

        return AllResponseDto.builder()
                .questionId(question.getQuestionId())
                .memberId(member.getId())
                .username(member.getUsername())
                .title(question.getTitle())
                .text(question.getText())
                .voteResult(question.getVoteResult())
                .views(question.getViews())
                .tags(tagsToTagResponseDtos(question.getTags()))
                .createdAt(question.getCreatedTime())
                .modifiedAt(question.getModifiedTime())
                .answers(answersToAnswerResponseDtos(answers))
                .answerCount(answers.size())
                .comments(commentsToCommentResponseDtos(commentRepository.findAllByQuestionId(question.getQuestionId())))
                .build();
    }
}

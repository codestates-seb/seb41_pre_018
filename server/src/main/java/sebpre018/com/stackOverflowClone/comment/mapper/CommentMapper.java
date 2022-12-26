package sebpre018.com.stackOverflowClone.comment.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.comment.dto.CommentDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPatchDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPostDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentResponseDto;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto) {
        // question id, answer id 받아오기 + text 받아오기
        Question question = new Question();
        question.setId(commentPostDto.getQuestionId());

        Answer answer = new Answer();
        answer.setAnswerId(commentPostDto.getAnswerId());

        Comment comment = new Comment();
        comment.setQuestion(question);
        comment.setAnswer(answer);
        comment.setText(commentPostDto.getText());

        return comment;
    }
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto){
        Question question = new Question();
        question.setId(commentPatchDto.getQuestionId());

        Answer answer = new Answer();
        answer.setAnswerId(commentPatchDto.getAnswerId());

        Comment comment = new Comment();
        comment.setQuestion(question);
        comment.setAnswer(answer);
        comment.setText(commentPatchDto.getText());

        return comment;
    }

    default CommentResponseDto commentToCommentResponse(Comment comment) {
//        Member member = comment.getMember();
        Question question = comment.getQuestion();
        Answer answer = comment.getAnswer();

        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
//                .memberId(member.getId())
                .questionId(question.getId())
                .answerId(answer.getAnswerId())
                .text(comment.getText())
                .build();

    }
    // 여기아래로 없애도 되는 것인지?
    CommentDto.Response commentToCommentResponseDto(Comment comment);
    List<CommentDto.Response> commentsToCommentResponseDto(List<Comment> comments);
}

package sebpre018.com.stackOverflowClone.comment.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPatchDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPostDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentResponseDto;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    default Comment commentPostDtoToComment(CommentPostDto commentPostDto) {
        // question id, answer id 받아오기 + text 받아오기
        Question question = new Question();
        question.setQuestionId(commentPostDto.getQuestionId());

        Comment comment = new Comment();
        comment.setQuestion(question);
        comment.setText(commentPostDto.getText());

        return comment;
    }
    default Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto){
        Question question = new Question();
        question.setQuestionId(commentPatchDto.getQuestionId());


        Comment comment = new Comment();
        comment.setCommentId(commentPatchDto.getCommentId());
        comment.setQuestion(question);
        comment.setText(commentPatchDto.getText());

        return comment;
    }

    default CommentResponseDto commentToCommentResponse(Comment comment) {
        Member member = comment.getMember();
        Question question = comment.getQuestion();

        return CommentResponseDto.builder()
                .commentId(comment.getCommentId())
                .memberId(member.getMemberId())
                .questionId(question.getQuestionId())
                .createdAt(comment.getCreatedTime())
                .modifiedAt(comment.getModifiedTime())
                .text(comment.getText())
                .build();

    }
    // 여기아래로 없애도 되는 것인지?
//    CommentDto.Response commentToCommentResponseDto(Comment comment);
//    List<CommentDto.Response> commentsToCommentResponseDto(List<Comment> comments);
}

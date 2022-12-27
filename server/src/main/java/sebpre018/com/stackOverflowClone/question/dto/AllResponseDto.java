package sebpre018.com.stackOverflowClone.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentResponseDto;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class AllResponseDto {
    private Long id;

    private Long memberId;

    private String title;

    private String text;

    private int voteResult;

    private int views;

    private List<TagResponseDto> tags;

    private List<AnswerResponseDto> answers;

    private List<CommentResponseDto> comments;
}

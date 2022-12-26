package sebpre018.com.stackOverflowClone.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private Long commentId;
    private Long memberId;
    private Long questionId;
    private Long answerId;

    private String text;
}

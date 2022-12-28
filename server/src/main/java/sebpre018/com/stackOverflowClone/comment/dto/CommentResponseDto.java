package sebpre018.com.stackOverflowClone.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class CommentResponseDto {
    private Long commentId;
    private Long memberId;
    private Long questionId;
    private Long answerId;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private String text;
}

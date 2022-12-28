package sebpre018.com.stackOverflowClone.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Builder
@Getter
@AllArgsConstructor
public class AnswerResponseDto {

    private Long answerId;

    private Long memberId;

    private Long questionId;

    private int voteResult;

    private String text;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;
}

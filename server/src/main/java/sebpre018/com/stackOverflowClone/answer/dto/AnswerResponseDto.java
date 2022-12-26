package sebpre018.com.stackOverflowClone.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class AnswerResponseDto {

    private Long answerId;

    private Long memberId;

    private Long questionId;

    private String text;
}

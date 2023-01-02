package sebpre018.com.stackOverflowClone.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
public class QuestionResponseDto {
    private Long questionId;

    private Long memberId;

    private String username;

    private String title;

    private String text;

    private int answerCount;

    private int voteResult;

    private int views;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private List<TagResponseDto> tags;
}

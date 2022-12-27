package sebpre018.com.stackOverflowClone.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Builder
@Getter
@AllArgsConstructor
public class QuestionResponseDto {
    private Long id;

    private Long memberId;

    private String title;

    private String text;

    private int voteResult;

    private int views;
}

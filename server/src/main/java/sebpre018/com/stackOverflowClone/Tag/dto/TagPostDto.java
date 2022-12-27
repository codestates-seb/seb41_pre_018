package sebpre018.com.stackOverflowClone.Tag.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
public class TagPostDto {

    private Long QuestionId;

    private String hashtag;

    public void updateQuestionId(Long questionId) {
        QuestionId = questionId;
    }
}

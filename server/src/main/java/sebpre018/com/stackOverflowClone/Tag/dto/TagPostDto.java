package sebpre018.com.stackOverflowClone.Tag.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TagPostDto {

    private Long QuestionId;

    private String hashTag;

    public void updateQuestionId(Long questionId) {
        QuestionId = questionId;
    }
}

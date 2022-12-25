package sebpre018.com.stackOverflowClone.question.dto;

import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

public class QuestionDto {

    @Getter
    public static class Post{

        @Positive
        private long memberId;

        @NotBlank(message = "제목을 입력해주세요")
        private String title;

        @NotBlank(message = "내용을 입력해주세요")
        private String text;


    }
}

package sebpre018.com.stackOverflowClone.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class AnswerDto {
    @Getter
    public static class Post {

//    private Long answerId;

        private Long memberId;
        private Long questionId;

        @NotBlank(message = "내용을 입력해야 합니다.")
        private String text;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch {
            private Long answerId;
            private Long memberId;
            private Long questionId;
            @NotBlank
            private String text;
        }

    @Getter
    @AllArgsConstructor
    public static class Response {

        private Long answerId;

        private Long memberId;

        private Long questionId;

        private String text;
    }
}

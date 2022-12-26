package sebpre018.com.stackOverflowClone.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

public class CommentDto {

    @Getter
    public static class Post{
        private long memberId;
        private long questionId;
        private long answerId;
        @NotBlank(message = "내용을 입력해 주세요")
        private String text;
    }

    @Getter
    @AllArgsConstructor
    public static class Response {
        private Long commentId;
        private Long memberId;
        private Long questionId;
        private Long answerId;
        private String text;
    }
}

package sebpre018.com.stackOverflowClone.comment.dto;


import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter

public class CommentPostDto {

    private Long questionId;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String text;
}


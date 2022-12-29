package sebpre018.com.stackOverflowClone.comment.dto;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter

public class CommentPatchDto {
    private Long commentId;
    private Long memberId;
    private Long questionId;

    @NotBlank
    private String text;

    // time 가져와야함

}

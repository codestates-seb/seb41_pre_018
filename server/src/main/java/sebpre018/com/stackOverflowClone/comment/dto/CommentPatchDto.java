package sebpre018.com.stackOverflowClone.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class CommentPatchDto {
    private Long memberId;
    private Long questionId;
    private Long answerId;
    @NotBlank(message = "내용을 입력해주세요")
    private String text;
}

package sebpre018.com.stackOverflowClone.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class CommentPostDto {
    private Long memberId;
    private Long questionId;
    private Long answerId;
    @NotBlank(message = "내용을 입력해주세요")
    private String text;
}



/* 질문에 사용하는 댓글, 답변에 사용하는 댓글의 PostDto를 나눠서 작성

case 1. 하나의 Postmethod를 사여ㅛㅇ하되
case 2.
 */
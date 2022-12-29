package sebpre018.com.stackOverflowClone.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.Text;

import javax.validation.constraints.NotBlank;
import java.math.BigInteger;
import java.sql.Blob;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@Setter
public class AnswerPostDto {

//    private Long answerId;

    private Long memberId;
    private Long questionId;

    @NotBlank(message = "내용을 입력해야 합니다.")
    private String text;

//    private LocalDateTime createdTime;
}
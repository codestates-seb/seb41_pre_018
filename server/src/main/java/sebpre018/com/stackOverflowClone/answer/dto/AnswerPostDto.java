package sebpre018.com.stackOverflowClone.answer.dto;

import org.w3c.dom.Text;

import javax.validation.constraints.NotBlank;
import java.math.BigInteger;
import java.sql.Blob;
import java.time.LocalDateTime;

public class AnswerPostDto {

    private BigInteger memberId;
    private Blob answerImage;
    @NotBlank
    private Text answerText;
    private LocalDateTime createdTime;

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public Text getAnswerText() {
        return answerText;
    }

    public Blob getAnswerImage() {
        return answerImage;
    }

    public BigInteger getMemberId() {
        return memberId;
    }
}

package sebpre018.com.stackOverflowClone.answer.dto;

import org.w3c.dom.Text;

import javax.validation.constraints.NotBlank;
import java.math.BigInteger;
import java.sql.Blob;

public class AnswerPatchDto {
    private BigInteger answerId;
    private BigInteger memberId;
    private Blob answerImage;
    @NotBlank
    private Text answerText;

    public Text getAnswerText() {
        return answerText;
    }

    public void setAnswerText(Text answerText) {
        this.answerText = answerText;
    }

    public Blob getAnswerImage() {
        return answerImage;
    }

    public void setAnswerImage(Blob answerImage) {
        this.answerImage = answerImage;
    }

    public BigInteger getMemberId() {
        return memberId;
    }

    public void setMemberId(BigInteger memberId) {
        this.memberId = memberId;
    }

    public BigInteger getAnswerId() {
        return answerId;
    }

    public void setAnswerId(BigInteger answerId) {
        this.answerId = answerId;
    }
}

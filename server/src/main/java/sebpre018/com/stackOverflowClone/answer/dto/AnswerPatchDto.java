package sebpre018.com.stackOverflowClone.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.w3c.dom.Text;

import javax.validation.constraints.NotBlank;
import java.math.BigInteger;
import java.sql.Blob;

@Getter
@Setter
@AllArgsConstructor
public class AnswerPatchDto {
    private Long answerId;

    private Long questionId;
    @NotBlank
    private String text;

    // time 가져와야함
}
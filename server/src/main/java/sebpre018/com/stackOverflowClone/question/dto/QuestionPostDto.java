package sebpre018.com.stackOverflowClone.question.dto;

import lombok.Getter;
import sebpre018.com.stackOverflowClone.Tag.dto.TagPostDto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
public class QuestionPostDto {

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    private String text;

    @NotNull(message = "태그를 입력해주세요")
    private List<TagPostDto> tags;

}

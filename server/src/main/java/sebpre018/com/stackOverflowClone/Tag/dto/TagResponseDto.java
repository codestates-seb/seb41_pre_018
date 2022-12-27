package sebpre018.com.stackOverflowClone.Tag.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class TagResponseDto {
    private Long id;

    private Long questionId;

    private String hashTag;
}

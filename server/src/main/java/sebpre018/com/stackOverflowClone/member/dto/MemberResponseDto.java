package sebpre018.com.stackOverflowClone.member.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class MemberResponseDto {
    private long id;
    private String email;
    private String username;
    private String password;
    private String aboutMe;
}

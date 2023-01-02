package sebpre018.com.stackOverflowClone.member.dto;

import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
public class MemberPostDto {
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Pattern(regexp = "[A-Za-z0-9가-힇]{2,20}")
    private String username;
    @NotBlank
    @Pattern(regexp = "^(?=.[A-Za-z])(?=.\\d)(?=.[$@$!%#?&])[A-Za-z\\d$@$!%#?&]{8,12}$")
    private String password;
}
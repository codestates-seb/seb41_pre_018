package sebpre018.com.stackOverflowClone.member.dto;

import lombok.*;
import sebpre018.com.stackOverflowClone.member.entity.Member;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

public class MemberDto {
    @Getter
    public static class Post{
        @NotBlank
        @Email
        private String email;
        @NotBlank
        @Pattern(regexp = "[A-Za-z0-9가-힇]{2,20}")
        private String username;
        @NotBlank
        @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@!%*#?&])[A-Za-z\\d@!%*#?&]{8,}$")
        private String password;
        @NotBlank
        private String aboutMe;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long id;
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        @NotBlank
        private String aboutMe;

        public void setMemberId(long id) {
            this.id = id;
        }
    }
    @AllArgsConstructor
    @Getter
    public static class Response{
        private long id;
        private String username;
        private String email;
        private String password;
        private String aboutMe;
        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
}

package sebpre018.com.stackOverflowClone.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MemberDto {
    @Getter
    public static class Post{
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        @NotBlank
        private String aboutMe;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch {
        private long id;
        private String email;
        private String username;
        private String password;
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
    }
}

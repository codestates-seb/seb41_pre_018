package sebpre018.com.stackOverflowClone.member.dto;

import lombok.*;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;
import java.util.List;

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
        @Pattern(regexp = "^(?=.[A-Za-z])(?=.\\d)(?=.[@!%#?&])[A-Za-z\\d@!%#?&]{8,}$")
        private String password;
        //private String aboutMe;
    }
    @Getter
    @AllArgsConstructor
    public static class Patch {

        private long memberId;
        @NotBlank
        @Email
        private String email;
        @NotBlank
        private String username;
        @NotBlank
        private String password;
        // @NotBlank
        private String aboutMe;

        public void setMemberId(long memberId) {
            this.memberId = memberId;
        }
    }
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class Response{
        private long memberId;
        private String username;
        private String email;
        private String password;
        private String aboutMe;

        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class AllResponse{
        private long memberId;
        private String username;
        private String email;
        //private String password;
        private String aboutMe;

        private List<MemberQuestionResponseDto> questions;
        private List<MemberAnswerResponseDto> answers;
        private LocalDateTime createdAt;

        private LocalDateTime modifiedAt;
    }
    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberQuestionResponseDto {
        private Long questionId;
        private String title;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class MemberAnswerResponseDto {
        private Long answerId;
        private String text;
    }
}
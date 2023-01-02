package sebpre018.com.stackOverflowClone.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.*;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "TEXT")
//    , nullable = false
    private String aboutMe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    public enum UserStatus {

        USER_ACTIVE("Active account"),
        USER_INACTIVE("Inactive account"),
        USER_QUIT("Deleted account");

        @Getter
        private final String status;

        UserStatus(String status) {
            this.status = status;
        }
    }

    public Member(String email){
        this.email = email;
    }
    public Member(String username, String email, String password, String aboutMe){
        this.username = username;
        this.email = email;
        this.password = password;
        this.aboutMe = aboutMe;
    }
    public Member(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Member(Long memberId, String username, String email, String password,
                  UserStatus userStatus, List<String> roles) {
        this.memberId = memberId;
        this.username = username;
        this.email = email;
        this.password = password;
        this.userStatus = userStatus;
        this.roles = roles;
    }
}
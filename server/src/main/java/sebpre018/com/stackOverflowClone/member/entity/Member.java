package sebpre018.com.stackOverflowClone.member.entity;

import lombok.*;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;

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
    private Long id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;
    @Column(columnDefinition = "TEXT", nullable = false)
    private String aboutMe;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private UserStatus userStatus = UserStatus.USER_ACTIVE;

    public enum UserStatus{
        USER_ACTIVE("활동중"),
        USER_SLEEP("휴면 상태"),
        USER_QUIT("탈퇴 상태");

        @Getter
        public String status;

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
}

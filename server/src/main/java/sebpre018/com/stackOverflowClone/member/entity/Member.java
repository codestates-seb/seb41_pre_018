package sebpre018.com.stackOverflowClone.member.entity;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Member {
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

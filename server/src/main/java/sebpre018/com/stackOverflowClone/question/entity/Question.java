package sebpre018.com.stackOverflowClone.question.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;
import sebpre018.com.stackOverflowClone.member.entity.Member;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Question extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Long questionId;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<Tag> tags = new ArrayList<>();

//    Post시 값을 넣어주지 않으므로 양방향 필요하지 않음
//    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
//    private List<Answer> answers = new ArrayList<>();
//
//    @OneToMany(mappedBy = "question", cascade = CascadeType.PERSIST)
//    private List<Comment> comments = new ArrayList<>();

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String text;

    @Column(nullable = false)
    private int voteResult = 0;

    @Column(nullable = false)
    private int views = 0;

//    BaseEntity 상속으로 변경
//    @Embedded
//    @Column(nullable = false)
//    private Time time;

}

package sebpre018.com.stackOverflowClone.answer.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import javax.persistence.*;
import java.sql.Time;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, updatable = false, unique = true)
    private Long answerId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member memberId;

//    @OneToMany(mappedBy = "answer")
    private Question id;

    @Column(nullable = false)
    private String text;

//    @Column(nullable = false)
//    private Time time;
//
//    @OneToMany(mappedBy = "answer")
//    private List<Comment> comment = new ArrayList<>();


}

package sebpre018.com.stackOverflowClone.comment.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question questionId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Long memberId;

    @ManyToOne
    @JoinColumn(name = "answer_id")
    private Long answerId;

    @NotBlank
    private String text;
}

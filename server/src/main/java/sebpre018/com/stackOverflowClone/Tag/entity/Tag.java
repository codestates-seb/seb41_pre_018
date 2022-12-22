package sebpre018.com.stackOverflowClone.Tag.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sebpre018.com.stackOverflowClone.question.audit.BaseEntity;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Tag extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Long id;

    @JoinColumn(name = "question_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Question question;

    @Column(nullable = false)
    private String hashTag;
}

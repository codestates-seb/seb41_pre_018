package sebpre018.com.stackOverflowClone.Tag.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sebpre018.com.stackOverflowClone.audit.BaseEntity;
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
    private Long tagId;


    @JoinColumn(name = "question_id")
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonBackReference
    private Question question;

    @Column(nullable = false)
    private String hashTag;

    public void addQuestion(Question question) {
        this.question = question;
        question.getTags().add(this);
    }
}

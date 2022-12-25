package sebpre018.com.stackOverflowClone.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.question.entity.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}

package sebpre018.com.stackOverflowClone.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;

import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> FindByAnswer(Long answerId);
}

package sebpre018.com.stackOverflowClone.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Optional<Answer> findByAnswer(Long answerId);

    @Query(value = "SELECT t FROM Tag t WHERE t.questionId = :questionId")
    List<Answer> findAllByQuestionId(long questionId);
}

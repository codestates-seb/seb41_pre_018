package sebpre018.com.stackOverflowClone.answer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {

    @Query(value = "select * from answer where question_id = :questionId", nativeQuery = true)
    List<Answer> findAllByQuestionId(long questionId);

    @Query(value = "select * from answer where member_id = :memberId", nativeQuery = true)
    List<Answer> findAllByMemberId(long memberId);
}
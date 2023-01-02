package sebpre018.com.stackOverflowClone.question.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    @Query(value = "SELECT q FROM Question q WHERE q.title LIKE %:keyWord%") //제목으로 검색
    List<Question> findAllByKeyWord(@Param("keyWord") String keyWord);

    @Query(value = "select * from question where member_id = :memberId", nativeQuery = true)
    List<Question> findAllByMemberId(long memberId);
}
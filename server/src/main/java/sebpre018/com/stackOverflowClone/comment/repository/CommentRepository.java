package sebpre018.com.stackOverflowClone.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByComment(Long commentId);

    @Query(value = "SELECT t FROM Tag t WHERE t.questionId = :questionId")
    List<Comment> findAllByQuestionId(long questionId);
}

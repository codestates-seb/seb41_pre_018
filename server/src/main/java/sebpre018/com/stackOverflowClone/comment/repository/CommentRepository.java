package sebpre018.com.stackOverflowClone.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    Optional<Comment> findByComment(Long commentId);
}

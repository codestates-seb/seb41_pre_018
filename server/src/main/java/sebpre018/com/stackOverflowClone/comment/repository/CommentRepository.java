package sebpre018.com.stackOverflowClone.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}

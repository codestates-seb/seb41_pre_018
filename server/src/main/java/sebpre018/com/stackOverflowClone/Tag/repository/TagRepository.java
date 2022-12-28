package sebpre018.com.stackOverflowClone.Tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;

import java.util.List;


@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    @Query(value = "select * from tag where question_id = :questionId", nativeQuery = true)
    List<Tag> findAllByQuestionId(long questionId);
}

package sebpre018.com.stackOverflowClone.Tag.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;


@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
}

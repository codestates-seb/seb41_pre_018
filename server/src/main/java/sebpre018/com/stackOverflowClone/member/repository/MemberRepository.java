package sebpre018.com.stackOverflowClone.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);
}

package sebpre018.com.stackOverflowClone.vote.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.vote.entity.Vote;

import java.util.List;
import java.util.Optional;

public interface VoteRepository extends JpaRepository<Vote,Long> {
    Optional<Vote> findByMemberAndQuestion(Member member, Question question);
    Optional<Vote> findByMemberAndAnswer(Member member, Answer answer);
}

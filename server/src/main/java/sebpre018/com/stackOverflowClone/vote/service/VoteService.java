package sebpre018.com.stackOverflowClone.vote.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.repository.MemberRepository;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;
import sebpre018.com.stackOverflowClone.vote.entity.Vote;
import sebpre018.com.stackOverflowClone.vote.repository.VoteRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;

@RequiredArgsConstructor
@Service
public class VoteService {
    private final VoteRepository voteRepository;
    private final QuestionRepository questionRepository;

    private final AnswerRepository answerRepository;

    public boolean addQuestionVote(Member member, Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        //question vote 중복 방지
        if (isNotAlreadyQuestionVote(member, question)) {
            Vote vote=voteRepository.save(new Vote(member, question));
            int voteCount= question.getVoteResult();
            if(vote.getStatus() == 1){
                voteCount++;
            }else if(vote.getStatus() == -1) voteCount--;
            question.setVoteResult(voteCount);
            questionRepository.save(question);
            return true;
        }
        return false;
    }
    public boolean addAnswerVote(Member member, Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();

        //answer vote 중복 방지
        if (isNotAlreadyAnswerVote(member, answer)) {
            Vote vote=voteRepository.save(new Vote(member, answer));
            int voteCount= 0;//answer.getVoteResult();
            if(vote.getStatus() == 1){
                voteCount++;
            }else if(vote.getStatus() == -1)voteCount--;
            //answer.setVoteResult(voteCount);
            answerRepository.save(answer);
            return true;
        }
        return false;
    }

    // member, question으로 검색되는 vote가 없다면 true
    private boolean isNotAlreadyQuestionVote(Member member, Question question) {
        return voteRepository.findByMemberAndQuestion(member, question).isEmpty();
    }
    // member, answer로 검색되는 vote가 없다면 true
    private boolean isNotAlreadyAnswerVote(Member member, Answer answer) {
        return voteRepository.findByMemberAndAnswer(member, answer).isEmpty();
    }

}
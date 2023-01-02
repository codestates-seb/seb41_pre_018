package sebpre018.com.stackOverflowClone.vote.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;
import sebpre018.com.stackOverflowClone.vote.entity.Vote;
import sebpre018.com.stackOverflowClone.vote.repository.VoteRepository;

@RequiredArgsConstructor
@Service
public class VoteService {
    private final VoteRepository voteRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;


    public boolean addQuestionVote(Member member, Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        //중복 방지
        if (isNotAlreadyQuestionVote(member, question)) {
            voteRepository.save(new Vote(member, question));
            int voteResult= question.getVoteResult();
            voteResult++;
            question.setVoteResult(voteResult);
            questionRepository.save(question);
            return true;
        }
        return false;
    }
    public boolean minusQuestionVote(Member member, Long questionId) {
        Question question = questionRepository.findById(questionId).orElseThrow();

        //중복 방지
        if (isNotAlreadyQuestionVote(member, question)) {
            voteRepository.save(new Vote(member, question));
            int voteResult= question.getVoteResult();
            voteResult--;
            question.setVoteResult(voteResult);
            questionRepository.save(question);
            return true;
        }
        return false;
    }
    public boolean addAnswerVote(Member member, Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();

        //중복 방지
        if (isNotAlreadyAnswerVote(member, answer)) {
            voteRepository.save(new Vote(member, answer));
            int voteResult= answer.getVoteResult();
            voteResult++;
            answer.setVoteResult(voteResult);
            answerRepository.save(answer);
            return true;
        }
        return false;
    }
    public boolean minusAnswerVote(Member member, Long answerId) {
        Answer answer = answerRepository.findById(answerId).orElseThrow();

        //중복 방지
        if (isNotAlreadyAnswerVote(member, answer)) {
            voteRepository.save(new Vote(member, answer));
            int voteResult= answer.getVoteResult();
            voteResult--;
            answer.setVoteResult(voteResult);
            answerRepository.save(answer);
            return true;
        }
        return false;
    }
    // member와, question으로 검색되는 vote가 없다면 true
    private boolean isNotAlreadyQuestionVote(Member member, Question question) {
        return voteRepository.findByMemberAndQuestion(member, question).isEmpty();
    }
    // member와, answer으로 검색되는 vote가 없다면 true
    private boolean isNotAlreadyAnswerVote(Member member, Answer answer) {
        return voteRepository.findByMemberAndAnswer(member, answer).isEmpty();
    }

}
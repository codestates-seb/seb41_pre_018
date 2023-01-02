package sebpre018.com.stackOverflowClone.answer.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;

import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final MemberService memberService;

    private final QuestionService questionService;


    public AnswerService(AnswerRepository answerRepository, MemberService memberService, QuestionService questionService, QuestionRepository questionRepository) {
        this.answerRepository = answerRepository;
        this.memberService = memberService;
        this.questionService = questionService;
    }

    public Answer createAnswer(Answer answer) {
        answer.setMember(memberService.getLoginMember());
        Question findQuestion = questionService.findQuestion(answer.getQuestion().getQuestionId());
        int answerCount = findQuestion.getAnswerCount();
        findQuestion.setAnswerCount(++answerCount);
        questionService.updateAnswerCount(findQuestion);
//        verifyExistsAnswer(answer.getAnswerId());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {

        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        Member writer = memberService.findVerifiedMember(findAnswer.getMember().getMemberId());
        answer.setMember(writer);
        if(memberService.getLoginMember().getMemberId() != writer.getMemberId())
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional.ofNullable(answer.getText())
                .ifPresent(text -> findAnswer.setText(text));

        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(Long answerId) {
//        throw new RuntimeException("Not found answer");
        return findVerifiedAnswer(answerId);
    }

    public Page<Answer> findAnswers(int page, int size) {
        return answerRepository.findAll(PageRequest.of(page, size, Sort.by("answerId").descending()));
    }

    public void deleteAnswer(Long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        Question findQuestion = questionService.findQuestion(findAnswer.getQuestion().getQuestionId());
        int answerCount = findQuestion.getAnswerCount();
        findQuestion.setAnswerCount(--answerCount);
        questionService.updateAnswerCount(findQuestion);
        Member writer = memberService.findVerifiedMember(findAnswer.getMember().getMemberId());
        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findAnswer;
    }

    private void verifyExistsAnswer(Long answerId) {
        Optional<Answer> answer = answerRepository.findById(answerId);
        if(answer.isPresent())
            throw new BusinessLogicException(ExceptionCode.ANSWER_EXISTS);
    }
}

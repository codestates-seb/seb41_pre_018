package sebpre018.com.stackOverflowClone.answer.service;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    public AnswerService(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }
    public Answer createAnswer(Answer answer) {
        verifyExistsAnswer(answer.getAnswerId());
        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(Long answerId) {

        Answer answer = new Answer(answerId, 1, 1, "답변 내용");
        return findVerifiedAnswer(answerId);
    }

    public List<Answer> findAnswers() {

        return answerRepository.findAll(Sort.by(answerId).descending);
    }

    public void deleteAnswer(Long answerId) {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> optionalAnswer = answerRepository.findById(answerId);
        Answer findAnswer = optionalAnswer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.));
    }

//    private void verifyExistsAnswerId(Long answerId) {
//        Optional<Answer> answer = answerRepository.findByAnswerId(answerId);
//        if(answer.isPresent())
//            throw new BusinessLogicException(ExceptionCode.)
//    }
}

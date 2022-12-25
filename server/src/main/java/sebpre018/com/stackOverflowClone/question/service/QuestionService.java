package sebpre018.com.stackOverflowClone.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.question.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final MemberService memberService;

    public Question createQuestion(Question question) {
        question.setMember(memberService.getLoginMember());
        //로그인한 Member 정보 얻어옴

        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        // 로그인한 member와 작성한 member Id를 비교해서 아니라면 예외 발생
        Question preQuestion = findVerifiedQuestion(question.getId()); // id를 통해 질문 찾기

        Member writer = memberService.findVerifiedMember(preQuestion.getMember().getId()); // 작성자 찾기
        if(memberService.getLoginMember().getId() != writer.getId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> preQuestion.setTitle(title));

        Optional.ofNullable(question.getText())
                .ifPresent(text -> preQuestion.setText(text));

        return questionRepository.save(question);
    }

    public Question findQuestion(long questionId){
        return findVerifiedQuestion(questionId);
    }
    public Question findVerifiedQuestion(long questionId) { //존재하는 질문인지 확인
        Optional<Question> optionalQuestion = questionRepository.findById(questionId);

        return optionalQuestion.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
        // 존재하지 않는 질문이라면 에러 발생
    }

    public void deleteQuestion(Long id) {
        Question question = findVerifiedQuestion(id);

        Member writer = memberService.findVerifiedMember(preQuestion.getMember().getId()); // 작성자 찾기
        if(memberService.getLoginMember().getId() != writer.getId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        questionRepository.delete(question);
    }
}

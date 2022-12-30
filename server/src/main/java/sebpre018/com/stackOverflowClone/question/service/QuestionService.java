package sebpre018.com.stackOverflowClone.question.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.Tag.repository.TagRepository;
import sebpre018.com.stackOverflowClone.Tag.service.TagService;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final MemberService memberService;

    private final TagService tagService;
    private final TagRepository tagRepository;

    public QuestionService(QuestionRepository questionRepository, MemberService memberService, TagService tagService,
                           TagRepository tagRepository) {
        this.questionRepository = questionRepository;
        this.memberService = memberService;
        this.tagService = tagService;
        this.tagRepository = tagRepository;
    }

    public Question createQuestion(Question question) {
        question.setMember(memberService.getLoginMember());
        //로그인한 Member 정보 얻어옴

        //verifyExistsQuestion(question.getQuestionId()); //존재하는 questionId인지 확인
        return questionRepository.save(question);
    }

    public Question updateQuestion(Question question){
        // 로그인한 member와 작성한 member Id를 비교해서 아니라면 예외 발생
        Question preQuestion = findVerifiedQuestion(question.getQuestionId()); // id를 통해 기존 질문 찾기
//
        Member writer = memberService.findVerifiedMember(preQuestion.getMember().getMemberId()); // 작성자 찾기
        if(memberService.getLoginMember().getMemberId() != writer.getMemberId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        Optional.ofNullable(question.getTitle())
                .ifPresent(title -> preQuestion.setTitle(title));

        Optional.ofNullable(question.getText())
                .ifPresent(text -> preQuestion.setText(text));


        tagService.deleteTags(preQuestion); //기존 태그 삭제
        preQuestion.setTags(tagService.createTags(question.getTags())); //새 태그 저장

        return questionRepository.save(preQuestion); //저장
    }

    public void deleteQuestion(Long id) {
        Question question = findVerifiedQuestion(id);
//
        Member writer = memberService.findVerifiedMember(question.getMember().getMemberId()); // 작성자 찾기
        if(memberService.getLoginMember().getMemberId() != writer.getMemberId()) // 작성자와 로그인한 사람이 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생(권한 없음)

        questionRepository.delete(question);
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

    private void verifyExistsQuestion(long questionId){
        Optional<Question> question = questionRepository.findById(questionId);
        if (question.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.QUESTION_EXISTS);
        }
    }

    public Page<Question> findQuestions(int page, int size, String sort) {
        Page<Question> findAllQuestion = questionRepository.findAll(
                PageRequest.of(page, size, Sort.by(sort).descending())
        );
        return findAllQuestion;
    }

    public Page<Question> searchQuestions(String keyWord, int page, int size, String sort) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sort).descending());
        List<Question> searchResult = questionRepository.findAllByKeyWord(keyWord);

        int start = (int)pageRequest.getOffset();
        int end = Math.min((start + pageRequest.getPageSize()), searchResult.size());
        Page<Question> questions = new PageImpl<>(searchResult.subList(start, end), pageRequest, searchResult.size());

        return questions;
    }
}

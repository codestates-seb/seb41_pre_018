package sebpre018.com.stackOverflowClone.question.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.Tag.service.TagService;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.comment.repository.CommentRepository;
import sebpre018.com.stackOverflowClone.question.dto.AllResponseDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPatchDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPostDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionResponseDto;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.mapper.QuestionMapper;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;
import sebpre018.com.stackOverflowClone.response.MultiResponseDto;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
public class QuestionController {

    private final QuestionService questionService;

    private final QuestionMapper mapper;

    private final TagService tagService;

    private final AnswerRepository answerRepository;

    private final CommentRepository commentRepository;
    public QuestionController(QuestionService questionService, QuestionMapper mapper,
                              TagService tagService, AnswerRepository answerRepository, CommentRepository commentRepository) {
        this.questionService = questionService;
        this.mapper = mapper;
        this.tagService = tagService;
        this.answerRepository = answerRepository;
        this.commentRepository = commentRepository;
    }

    //질문 등록
    @Secured("ROLE_USER")
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));
        QuestionResponseDto response = mapper.questionToQuestionResponse(question);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response) , HttpStatus.CREATED
        );
    }

    //질문 수정
@Secured("ROLE_USER")
    @PatchMapping("/{id}")
    public ResponseEntity patchQuestion(@PathVariable("id") @Positive Long id,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto){
        questionPatchDto.updateId(id); //id 설정
        Question question = questionService.updateQuestion(mapper.questionPatchDtoToQuestion(questionPatchDto));
        QuestionResponseDto response = mapper.questionToQuestionResponse(question);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //질문 조회(질문 상세 페이지)
    @GetMapping("/{id}")
    public ResponseEntity getQuestion(@PathVariable("id") @Positive Long id) {
        Question question = questionService.findQuestion(id);
        int view = question.getViews();
        question.setViews(++view); //조회수 증가

        AllResponseDto response = mapper.questionToAllResponse(question, answerRepository, commentRepository);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //전체 질문 페이지
    @GetMapping()
    public ResponseEntity getQuestions(@Positive @RequestParam("page") int page,
                                       @Positive @RequestParam("size") int size,
                                       @RequestParam("sort") String sort){
        Page<Question> pageQuestions = questionService.findQuestions(page-1, size, sort);

        List<Question> questions = pageQuestions.getContent();
        questions.stream().forEach(question -> question.setTags(tagService.findTagsByQuestionId(question.getQuestionId())));

        return new ResponseEntity<> (new MultiResponseDto<>(
                mapper.questionsToQuestionResponseDtos(questions), pageQuestions)
                , HttpStatus.OK);
    }

    //질문 검색
    @GetMapping("/search")
    public ResponseEntity getQuestions(@RequestParam("search") String keyWord,
                                       @Positive @RequestParam("page") int page,
                                       @Positive @RequestParam("size") int size,
                                       @RequestParam("sort") String sort){


        Page<Question> searchResult = questionService.searchQuestions(keyWord,page-1,size,sort);

        List<Question> questions = searchResult.getContent();
        questions.stream().forEach(question -> question.setTags(tagService.findTagsByQuestionId(question.getQuestionId())));

        return new ResponseEntity<>(new MultiResponseDto<>(
                mapper.questionsToQuestionResponseDtos(questions),
                searchResult),HttpStatus.OK);

    }

    //질문 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity deleteQuestion(@PathVariable("id") @Positive Long id){
        questionService.deleteQuestion(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

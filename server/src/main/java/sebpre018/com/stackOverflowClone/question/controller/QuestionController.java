package sebpre018.com.stackOverflowClone.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPatchDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionPostDto;
import sebpre018.com.stackOverflowClone.question.dto.QuestionResponseDto;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.mapper.QuestionMapper;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questions")
@Validated
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    private final QuestionMapper mapper;

    //질문 등록
//   @Secured("ROLE_USER") -> 로그인한 회원에게 권한 부여
    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto){
        Question question = questionService.createQuestion(mapper.questionPostDtoToQuestion(questionPostDto));
        QuestionResponseDto response = mapper.questionToQuestionResponse(question);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response) , HttpStatus.CREATED
        );
    }

    //질문 수정
    //@Secured("ROLE_USER")
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

    //질문 조회
    @GetMapping("/{id}")
    public ResponseEntity getQuestion(@PathVariable("id") @Positive Long id) {
        Question question = questionService.findQuestion(id);
        int view = question.getViews();
        question.setViews(++view); //조회수
        QuestionResponseDto response = mapper.questionToQuestionResponse(question);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //질문 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity deleteQuestion(@PathVariable("id") @Positive Long id){
        questionService.deleteQuestion(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}

package sebpre018.com.stackOverflowClone.answer.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPatchDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPostDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.mapper.AnswerMapper;
import sebpre018.com.stackOverflowClone.answer.service.AnswerService;
import sebpre018.com.stackOverflowClone.response.MultiResponseDto;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/answers")
@Validated
@Slf4j
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") Long questionId,
                                     @Valid @RequestBody AnswerDto.Post requestBody){

        Answer answer = mapper.answerPostDtoToAnswer(requestBody);
        Answer createdAnswer = answerService.createAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(createdAnswer), HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/{answer-id}")
    public ResponseEntity patchAnswer(@PathVariable("question-id") Long questionId,
                                      @PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestBody) {
        requestBody.setAnswerId(answerId);

        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/{question-id}/{answer-id}")
    public ResponseEntity getAnswer(@PathVariable("question-id") Long questionId,
                                    @PathVariable("answer-id") Long answerId) {

        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers(@RequestParam int page,
                                     @RequestParam int size) {
        Page<Answer> pageAnswers = answerService.findAnswers(page-1, size);
        List<Answer> answers = pageAnswers.getContent();
        return new ResponseEntity<>(new MultiResponseDto<>(mapper.answersToAnswerResponseDtos(answers),pageAnswers),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteAnswer(@PathVariable("answer-id") Long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

//    @ExceptionHandler
//    public ResponseEntity handleException(MethodArgumentNotValidException e) {
//        final List<FieldError> fieldErrors = e.getBindingResult().getFieldErrors();
//
//        List<ErrorResponse.FieldError> errors = fieldErrors.stream()
//                .map(error -> new ErrorResponse.FieldError(
//                        error.getField(),
//                        error.getRejectedValue(),
//                        error.getDefaultMessage()))
//                .collect(Collectors.toList());
//
//        return new ResponseEntity<>(new ErrorResponse(errors), HttpStatus.BAD_REQUEST);
//    }
}

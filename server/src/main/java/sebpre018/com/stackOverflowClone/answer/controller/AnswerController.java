package sebpre018.com.stackOverflowClone.answer.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPatchDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerPostDto;
import sebpre018.com.stackOverflowClone.answer.dto.AnswerResponseDto;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.mapper.AnswerMapper;
import sebpre018.com.stackOverflowClone.answer.service.AnswerService;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/answers")
@Validated
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper mapper;

    public AnswerController(AnswerService answerService, AnswerMapper mapper) {
        this.answerService = answerService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postAnswer(@Valid @RequestBody AnswerDto.Post requestBody){

        Answer answer = mapper.answerPostDtoToAnswer(requestBody);
        Answer createdAnswer = answerService.createAnswer(answer);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(createdAnswer), HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchAnswer(@PathVariable("id") Long answerId,
                                      @Valid @RequestBody AnswerDto.Patch requestBody) {
        requestBody.setAnswerId(answerId);

        Answer answer = answerService.updateAnswer(mapper.answerPatchDtoToAnswer(requestBody));

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity getAnswer(@PathVariable("id") Long answerId) {

        Answer answer = answerService.findAnswer(answerId);

        return new ResponseEntity<>(mapper.answerToAnswerResponseDto(answer), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getAnswers() {
        List<AnswerResponseDto> response = answers.stream()
                .map(answer -> mapper.answerToAnswerResponseDto(answers))
                .collect(Collectors.toList());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteAnswer(@PathVariable("id") Long answerId) {
        answerService.deleteAnswer(answerId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

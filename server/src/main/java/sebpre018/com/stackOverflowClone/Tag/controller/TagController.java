package sebpre018.com.stackOverflowClone.Tag.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.Tag.dto.TagPostDto;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.Tag.mapper.TagMapper;
import sebpre018.com.stackOverflowClone.Tag.service.TagService;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
@Validated
public class TagController {

//    private final QuestionService questionService;
    private final TagService tagService;
    private final TagMapper mapper;

    public TagController(TagService tagService, TagMapper mapper) {
        this.tagService = tagService;
        this.mapper = mapper;
    }

    //태그 등록
    @PostMapping("/{question-id}/tags")
    public ResponseEntity postTag(@PathVariable("question-id") @Positive Long questionId,
                                  @Valid @RequestBody TagPostDto tagPostDto) {
        tagPostDto.updateQuestionId(questionId); // PostDto에 QuestionId 설정해주기

        Tag tag = tagService.createTag(mapper.tagPostDtoToTag(tagPostDto));
        TagResponseDto response = mapper.tagToTagResponseDto(tag);

        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    //태그 전체 조회(질문 상세페이지에서 사용)
    @GetMapping("/{questions-id}/tags")
    public ResponseEntity getTags(){
        List<Tag> tagList = tagService.findTags();

        return new ResponseEntity<>(mapper.tagToTagDtos(tagList), HttpStatus.OK);
    }

    //태그 삭제 (태그 전체 삭제는 질문과 영속성을 통해 관리)
    @DeleteMapping("/{questions-id}/tags/{id}")
    public ResponseEntity deleteTag(@PathVariable("question-id") @Positive Long questionId,
                                    @PathVariable("id") @Positive Long id){
        tagService.deleteTag(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 태그 수정 기능은 존재하지 않음
}

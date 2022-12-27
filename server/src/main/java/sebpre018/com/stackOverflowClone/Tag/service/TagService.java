package sebpre018.com.stackOverflowClone.Tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.Tag.repository.TagRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagService {


    private final TagRepository tagRepository;


    public List<Tag> findTags() {
        return tagRepository.findAll();
    }


    public void deleteTags(Question question) {
        long questionId = question.getId();

        List<Tag> tags = tagRepository.findAllByQuestionId(questionId); // Id를 통해 태그 리스트 조회

        tags.stream().forEach(tag -> tagRepository.delete(tag)); //조회한 태그 삭제
    }

    public List<Tag> createTags(List<Tag> tags) {
        return tags.stream().map(tag -> tagRepository.save(tag)).collect(Collectors.toList());
    }
}

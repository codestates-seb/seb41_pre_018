package sebpre018.com.stackOverflowClone.Tag.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.Tag.repository.TagRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagService {


    private final TagRepository tagRepository;

    public Tag createTag(Tag tag) {

        return tagRepository.save(tag);
    }

    public List<Tag> findTags() {
        return tagRepository.findAll();
    }

    public void deleteTag(@Positive Long id) {
        Tag findTag = findVerifiedTag(id);
        tagRepository.delete(findTag);
    }

    private Tag findVerifiedTag(Long id) {
        Optional<Tag> optionalTag = tagRepository.findById(id);

        Tag findTag = optionalTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));

        return findTag;
    }
}

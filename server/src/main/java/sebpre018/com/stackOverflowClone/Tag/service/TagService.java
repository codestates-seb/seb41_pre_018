package sebpre018.com.stackOverflowClone.Tag.service;

import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.Tag.repository.TagRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TagService {


    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public Tag createTag(Tag tag) {
        verifyExistsTag(tag.getTagId());
        return tagRepository.save(tag);
    }

    public void deleteTags(Question question) {
        long questionId = question.getQuestionId();

        List<Tag> tags = tagRepository.findAllByQuestionId(questionId); // Id를 통해 태그 리스트 조회

        tags.stream().forEach(tag -> tagRepository.delete(tag)); //조회한 태그 삭제
    }

    public List<Tag> findTags() {
        return tagRepository.findAll();
    }

    public List<Tag> findTagsByQuestionId(Long questionId){
        return tagRepository.findAllByQuestionId(questionId);
    }



    public List<Tag> createTags(List<Tag> tags) {
        return tags.stream().map(tag -> tagRepository.save(tag)).collect(Collectors.toList());
    }


    public void deleteTag(Long id) {
        Tag tag = findVerifiedTag(id);

        tagRepository.delete(tag);
    }

    public Tag findVerifiedTag(long id){
        Optional<Tag> optionalTag = tagRepository.findById(id);

        return optionalTag.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.TAG_NOT_FOUND));
    }
    private void verifyExistsTag(Long id) {
        Optional<Tag> tag = tagRepository.findById(id);

        if(tag.isPresent()){
            throw new BusinessLogicException(ExceptionCode.TAG_EXISTS);
        }
    }
}

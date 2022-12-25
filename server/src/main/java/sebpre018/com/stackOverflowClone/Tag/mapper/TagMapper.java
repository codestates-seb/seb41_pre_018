package sebpre018.com.stackOverflowClone.Tag.mapper;


import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.Tag.dto.TagPostDto;
import sebpre018.com.stackOverflowClone.Tag.dto.TagResponseDto;
import sebpre018.com.stackOverflowClone.Tag.entity.Tag;
import sebpre018.com.stackOverflowClone.question.entity.Question;

import java.util.List;

@Mapper(componentModel = "spring")
public interface TagMapper {
    default Tag tagPostDtoToTag(TagPostDto tagPostDto){

        Question question = new Question();
        question.setId(tagPostDto.getQuestionId());
        Tag tag = new Tag();

        tag.setQuestion(question);
        tag.setHashTag(tagPostDto.getHashtag());

        return tag;
    }

    default TagResponseDto tagToTagResponseDto(Tag tag){
        return TagResponseDto.builder()
                .hashTag(tag.getHashTag())
                .id(tag.getId())
                .questionId(tag.getQuestion().getId())
                .build();
    }

    List<TagResponseDto> tagToTagDtos(List<Tag> tags);
}

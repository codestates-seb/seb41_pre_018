package sebpre018.com.stackOverflowClone.member.mapper;

import org.mapstruct.Mapper;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.dto.MemberPostDto;
import sebpre018.com.stackOverflowClone.member.dto.MemberResponseDto;
import sebpre018.com.stackOverflowClone.member.dto.MemberPatchDto;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post requestBody);
    Member memberPatchDtoToMember(MemberDto.Patch requestBody);
    MemberDto.Response memberToMemberResponseDto(Member member);
    List<MemberDto.Response> membersToMemberResponseDtos(List<Member> members);
}
package sebpre018.com.stackOverflowClone.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.mapper.MemberMapper;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;
import sebpre018.com.stackOverflowClone.util.UriCreator;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@Validated
@RequestMapping("/members")
@Slf4j
public class MemberController {
    //private final static String MEMBER_DEFAULT_URL = "/members";
    private final MemberService memberService;
    private final MemberMapper mapper;

    public MemberController(MemberService memberService, MemberMapper mapper){
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody){
        Member member = mapper.memberPostDtoToMember(requestBody);
        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(createdMember)),
                HttpStatus.CREATED);
    }
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(
            @PathVariable("member-id") @Positive long id,
            @Valid @RequestBody MemberDto.Patch requestBody) {
        requestBody.setMemberId(id);

        Member member =
                memberService.updateMember(mapper.memberPatchDtoToMember(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member)),
                HttpStatus.OK);
    }
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(
            @PathVariable("member-id") @Positive long id) {
        Member member = memberService.findMember(id);
        return new ResponseEntity<>(
                new SingleResponseDto<>(mapper.memberToMemberResponseDto(member))
                , HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(
            @PathVariable("member-id") @Positive long id) {
        memberService.deleteMember(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

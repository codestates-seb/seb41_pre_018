package sebpre018.com.stackOverflowClone.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.answer.repository.AnswerRepository;
import sebpre018.com.stackOverflowClone.member.assembler.MemberAssembler;
import sebpre018.com.stackOverflowClone.member.dto.MemberDto;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.mapper.MemberMapper;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.repository.QuestionRepository;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;
@RestController
@Validated
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final AnswerRepository answerRepository;
    private final QuestionRepository questionRepository;
    private final MemberService memberService;
    private final MemberMapper mapper;
    private final MemberAssembler assembler;

    public MemberController(MemberService memberService, MemberMapper mapper, MemberAssembler assembler,
                            QuestionRepository questionRepository,
                            AnswerRepository answerRepository) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.assembler = assembler;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    @GetMapping("/{id}")
    public EntityModel<Member> getMember(@PathVariable long id) {
        Member member = memberService.findMember(id);
        return assembler.toModel(member);
    }

    @GetMapping
    public CollectionModel<EntityModel<Member>> getMembers() {
        List<EntityModel<Member>> users = memberService.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());

        return CollectionModel.of(users,
                linkTo(methodOn(MemberService.class).findAll()).withSelfRel());
    }

    @PostMapping
    public ResponseEntity<?> postMember(@Valid @RequestBody MemberDto.Post requestBody) {
        // Test - using Mapper
        Member member = mapper.memberPostDtoToMember(requestBody);
        EntityModel<Member> entityModel = assembler.toModel(memberService.createMember(member));
        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> patchMember(@RequestBody Member member, @PathVariable long id) {
        EntityModel<Member> entityModel = assembler.toModel(memberService.updateMember(member, id));
        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMember(@PathVariable long id) {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/Info")
    public ResponseEntity getQuestion(@PathVariable("id") @Positive Long id) {
        Member member = memberService.findMember(id);

        MemberDto.AllResponse response = mapper.InfoResponse(member, questionRepository, answerRepository);
        return new ResponseEntity<>(
                new SingleResponseDto<>(response), HttpStatus.OK
        );
    }

    @GetMapping("/emailCheck/{email}")
    public ResponseEntity<Boolean> verifyExistsEmail(@PathVariable("email") String email){
        return ResponseEntity.ok(memberService.verifyExistsEmail(email));
    }

}


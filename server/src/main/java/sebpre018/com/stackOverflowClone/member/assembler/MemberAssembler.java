package sebpre018.com.stackOverflowClone.member.assembler;


import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.stereotype.Component;
import sebpre018.com.stackOverflowClone.member.controller.MemberController;
import sebpre018.com.stackOverflowClone.member.entity.Member;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class MemberAssembler implements RepresentationModelAssembler<Member, EntityModel<Member>> {

    @Override
    public EntityModel<Member> toModel(Member member) {
        return EntityModel.of(member,
                WebMvcLinkBuilder.linkTo(methodOn(MemberController.class).getMember(member.getMemberId())).withSelfRel(),
                linkTo(methodOn(MemberController.class).getMembers()).withRel("members"));
    }

}
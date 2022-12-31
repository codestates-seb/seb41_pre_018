package sebpre018.com.stackOverflowClone.vote.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.vote.service.VoteService;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/vote")
public class VoteController {
    private final VoteService voteService;
    private final MemberService memberService;

    //질문 vote Up를 눌렀을 때
    @PostMapping("/questions/{questionId}/{memberId}/up")
    public void plusQuestionVote(@PathVariable ("questionId") Long questionId,
                                 @PathVariable("memberId") Long memberId) {
        boolean result = false;
        Member member = memberService.findMember(memberId);
        result = voteService.addQuestionVote(member, questionId);

        if (!result) { //투표 한 적이 있을 때
            throw new BusinessLogicException(ExceptionCode.VOTED);
        }
    }
    //질문 vote Down을 눌렀을 때
    @PostMapping("/questions/{questionId}/{memberId}/down")
    public void minusQuestionVote(@PathVariable("questionId") Long questionId,
                                  @PathVariable("memberId") Long memberId) {
        boolean result = false;
        Member member = memberService.findMember(memberId);
        result = voteService.minusQuestionVote(member, questionId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.VOTED);
        }
    }
    //답변 vote Up을 눌렀을 때
    @PostMapping("/answers/{answerId}/{memberId}/up")
    public void plusAnswerVote(@PathVariable("answerId") Long answerId,
                               @PathVariable("memberId") Long memberId) {
        boolean result = false;
        Member member = memberService.findMember(memberId);
        result = voteService.addAnswerVote(member, answerId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.VOTED);
        }
    }
    //답변 vote Down을 눌렀을 때
    @PostMapping("/answers/{answerId}/{memberId}/down")
    public void minusAnswerVote(@PathVariable("answerId") Long answerId,
                               @PathVariable("memberId") Long memberId) {
        boolean result = false;
        Member member = memberService.findMember(memberId);
        result = voteService.minusAnswerVote(member, answerId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.VOTED);
        }
    }
}
package sebpre018.com.stackOverflowClone.vote.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;
import sebpre018.com.stackOverflowClone.vote.dto.VoteDto;
import sebpre018.com.stackOverflowClone.vote.entity.Vote;
import sebpre018.com.stackOverflowClone.vote.mapper.VoteMapper;
import sebpre018.com.stackOverflowClone.vote.service.VoteService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Positive;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/")
public class VoteController {
    private final VoteService voteService;
    private final MemberService memberService;

    //question 추천
    @PostMapping("/question/{questionId}/vote/{voteId}")
    public void QuestionUpVote(@PathVariable("questionId") Long questionId,
                                 HttpServletRequest request) {
        boolean result = false;
        result = voteService.QuestionVote(memberService.getLoginMember(), questionId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.VOTED);//중복투표시 예외 발생
        }
    }

    //answer 추천
    @PostMapping("/answer/{answerId}/vote/{voteId}/up")
    public void plusAnswerVote(@PathVariable("answerId") Long answerId,
                               HttpServletRequest request) {
        boolean result = false;
        result = voteService.AnswerVote(memberService.getLoginMember(), anwerId);

        if (!result) {
            throw new BusinessLogicException(ExceptionCode.VOTED;//중복투표시 예외 발생
        }
    }

}
}
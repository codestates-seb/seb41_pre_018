package sebpre018.com.stackOverflowClone.comment.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.answer.entity.Answer;
import sebpre018.com.stackOverflowClone.answer.service.AnswerService;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.comment.repository.CommentRepository;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.question.entity.Question;
import sebpre018.com.stackOverflowClone.member.service.MemberService;
import sebpre018.com.stackOverflowClone.question.service.QuestionService;

import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final QuestionService questionService;
    private final AnswerService answerService;
    public CommentService(CommentRepository commentRepository, MemberService memberService,
                          QuestionService questionService, AnswerService answerService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.questionService = questionService;
        this.answerService = answerService;
    }


    public Comment createComment(Comment comment) {
//        verifyExistsComment(comment.getId());
        // questionId, memberId, answerId 정보를 얻어와야함
        // 여기서 if answerid==null question id만 가지고 ~~ updatComment도 마찬가지?
//        comment.setMemberId(memberService.getLoginMember()); // 토큰을 이용해서 받아옴
//        comment.setQuestionId(questionService.getQuestionId());
//        comment.setAnswerId(answerService.getAnswerId());
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getId());
        Member writer = memberService.findVerifiedMember(findComment.getMember().getId());
        Question question = questionService.findVerifiedQuestion(findComment.getQuestion().getQuestionId());
        Answer answer = answerService.findVerifiedAnswer(findComment.getAnswer().getAnswerId());

        return commentRepository.save(comment);
    }

    public Comment findComment(Long commentId) {
        return findVerifiedComment(commentId);
    }

    public Page<Comment> findComments(int page, int size) {
        return commentRepository.findAll(PageRequest.of(page, size, Sort.by("commentId").descending()));
    }

    public void deleteComment(Long commentId) {
        Comment findComment = findVerifiedComment(commentId);
        Member writer = memberService.findVerifiedMember(findComment.getMember().getId());
        Question question = questionService.findVerifiedQuestion(findComment.getQuestion().getQuestionId());
        Answer answer = answerService.findVerifiedAnswer(findComment.getAnswer().getAnswerId());

        commentRepository.delete(findComment);
    }

    public Comment findVerifiedComment(Long commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment findComment = optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
        return findComment;
    }

    private void verifyExistsComment(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        if(comment.isPresent())
            throw new BusinessLogicException(ExceptionCode.ANSWER_EXISTS);
    }
}

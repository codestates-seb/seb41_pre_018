package sebpre018.com.stackOverflowClone.comment.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
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
    public CommentService(CommentRepository commentRepository, MemberService memberService,
                          QuestionService questionService, AnswerService answerService) {
        this.commentRepository = commentRepository;
        this.memberService = memberService;
        this.questionService = questionService;
    }


    public Comment createComment(Comment comment) {
//        verifyExistsComment(comment.getId());
        // questionId, memberId, answerId 정보를 얻어와야함
        // 여기서 if answerid==null question id만 가지고 ~~ updatComment도 마찬가지?
        comment.setMember(memberService.getLoginMember()); // 토큰을 이용해서 받아옴
//        comment.setAnswerId(answerService.getAnswerId());
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        Comment findComment = findVerifiedComment(comment.getCommentId()); //기존 댓글 찾기
        Member writer = memberService.findVerifiedMember(findComment.getMember().getMemberId()); //기존 댓글 작성자 찾기
        comment.setMember(writer); //MemberId responseDto에서 사용해주기 위해 세팅
        if(memberService.getLoginMember().getMemberId() != writer.getMemberId()) // 작성자와 로그인한 사람 다를 경우
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED); //예외 발생

        Optional.ofNullable(comment.getText())
                .ifPresent(text -> findComment.setText(text));

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
        Member writer = memberService.findVerifiedMember(findComment.getMember().getMemberId());
        Question question = questionService.findVerifiedQuestion(findComment.getQuestion().getQuestionId());

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

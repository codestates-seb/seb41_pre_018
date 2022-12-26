package sebpre018.com.stackOverflowClone.comment.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPatchDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPostDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentResponseDto;
import sebpre018.com.stackOverflowClone.comment.entity.Comment;
import sebpre018.com.stackOverflowClone.comment.mapper.CommentMapper;
import sebpre018.com.stackOverflowClone.comment.service.CommentService;
import sebpre018.com.stackOverflowClone.response.SingleResponseDto;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/comments")
@Validated
@Slf4j
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;
    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }
    // 질문에 댓글 작성하기
    @PostMapping("/{question-id}")
    public ResponseEntity postComment(@PathVariable("question-id") Long questionId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = commentService.createComment(mapper.commentPostDtoToComment(commentPostDto));
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }
    // 답변에 댓글 작성하기
    @PostMapping("/{question-id}/{answer-id}")
    public ResponseEntity postComment(@PathVariable("question-id") Long questionId,
                                      @PathVariable("answer-id") Long answerId,
                                      @Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = commentService.createComment(mapper.commentPostDtoToComment(commentPostDto));
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.CREATED);
    }
    // 질문에 달린 댓글 수정하기
    @PatchMapping("/{question-id}/{comment-id}") // question에 달린 comment라면 answer-id부분 어떻게 처리해야 하는지
    public ResponseEntity patchComment(@PathVariable("question-id") Long questionId,
                                       @PathVariable("comment-id") Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        Comment comment = commentService.updateComment(mapper.commentPatchDtoToComment(commentPatchDto));
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 답변에 달린 댓글 수정하기
    @PatchMapping("/{question-id}/{answer-id}/{comment-id}") // question에 달린 comment라면 answer-id부분 어떻게 처리해야 하는지
    public ResponseEntity patchComment(@PathVariable("question-id") Long questionId,
                                       @PathVariable("answer-id") Long answerId,
                                       @PathVariable("comment-id") Long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        Comment comment = commentService.updateComment(mapper.commentPatchDtoToComment(commentPatchDto));
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 질문에 달린 댓글 조회하기
    @GetMapping("/{question-id}/{comment-id}")
    public ResponseEntity getComment(@PathVariable("question-id") Long questionId,
                                     @PathVariable("comment-id") Long commentId) {
        Comment comment = commentService.findComment(commentId);
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 답변에 달린 댓글 조회하기
    @GetMapping("/{question-id}/{answer-id}/{comment-id}")
    public ResponseEntity getComment(@PathVariable("question-id") Long questionId,
                                     @PathVariable("answer-id") Long answerId,
                                     @PathVariable("comment-id") Long commentId) {
        Comment comment = commentService.findComment(commentId);
        CommentResponseDto response = mapper.commentToCommentResponse(comment);

        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
    }
    // 댓글 전체조회하기 -> 수정 요함
    @GetMapping
    public ResponseEntity getComments(@RequestParam int page,
                                      @RequestParam int size) {
        Page<Comment> pageComments = commentService.findComments(page-1, size);
        List<Comment> comments = pageComments.getContent();

        return new ResponseEntity<>(new MultiResponseDto<>(mapper.commentsToCommentResponseDtos(comments),
                pageComments), HttpStatus.OK);
    }
    // 질문에 달린 댓글 삭제하기
    @DeleteMapping("{question-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") Long questionId,
                                        @PathVariable("answer-id") Long answerId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    // 답변에 달린 댓글 삭제하기
    @DeleteMapping("{question-id}/{answer-id}")
    public ResponseEntity deleteComment(@PathVariable("question-id") Long questionId,
                                        @PathVariable("answer-id") Long answerId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}

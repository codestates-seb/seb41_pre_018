package sebpre018.com.stackOverflowClone.comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPatchDto;
import sebpre018.com.stackOverflowClone.comment.dto.CommentPostDto;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {

        return new ResponseEntity<>(commentPostDto, HttpStatus.CREATED);
    }

    @PatchMapping("/{id}")
    public ResponseEntity patchComment(@PathVariable("id") Long id,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(id);

        return new ResponseEntity<>(commentPatchDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getComments() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteComment(@PathVariable("id") Long id) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

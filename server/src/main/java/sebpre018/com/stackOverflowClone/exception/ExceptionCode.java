package sebpre018.com.stackOverflowClone.exception;

import lombok.Getter;

public enum ExceptionCode {

    QUESTION_NOT_FOUND(404,"Question Not Found"),
    QUESTION_EXISTS(409, "Question Exists"),
    QUESTION_CANNOT_CHANGE(403,"Question Can Not Be Changed"),

    Comment_NOT_FOUND(404,"Comment Not Found"),
    Comment_EXISTS(409, "Comment Exists"),
    Comment_CANNOT_CHANGE(403,"Comment Can Not Be Changed"),

    ANSWER_NOT_FOUND(404,"Answer Not Found"),
    ANSWER_EXISTS(409, "Answer Exists"),
    ANSWER_CANNOT_CHANGE(403,"Answer Can Not Be Changed"),
    ANSWER_DELETED(405, "Answer Already Deleted"),

    MEMBER_NOT_FOUND(404, "Member not found"),
    EMAIL_EXISTS(409, "Email Exists"),
    MEMBER_EXISTS(409, "Member exists"),

    MEMBER_NOT_ALLOWED(403, "MEMBER Not Allowed"),
    MEMBER_CANNOT_CHANGE(403,"MEMBER Can Not Be Changed"),

    VOTED(409, "Already Voted"),

    TAG_NOT_FOUND(404, "Tag not found" ),

    UNAUTHORIZED(401, "Unauthorized");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
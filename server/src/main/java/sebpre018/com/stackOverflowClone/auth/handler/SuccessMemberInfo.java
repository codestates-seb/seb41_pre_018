package sebpre018.com.stackOverflowClone.auth.handler;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class SuccessMemberInfo {
    private int httpStatus;
    private long memberId;
    private String email;
    private String username;
    private String aboutMe;
}

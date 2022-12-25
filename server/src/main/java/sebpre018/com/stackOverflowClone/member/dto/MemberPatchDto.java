package sebpre018.com.stackOverflowClone.member.dto;

import lombok.Getter;

@Getter
public class MemberPatchDto {
    private long id;

    private String username;
    private String email;
    private String password;
    private String aboutMe;

    public void setMemberId(long id){
        this.id = id;
    }

}

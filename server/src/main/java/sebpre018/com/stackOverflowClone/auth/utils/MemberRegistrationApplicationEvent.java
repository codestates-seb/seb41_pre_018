package sebpre018.com.stackOverflowClone.auth.utils;

import lombok.Getter;
import sebpre018.com.stackOverflowClone.member.entity.Member;

@Getter
public class MemberRegistrationApplicationEvent {
    private Member member;
    public MemberRegistrationApplicationEvent(Member member) {
        this.member = member;
    }
}

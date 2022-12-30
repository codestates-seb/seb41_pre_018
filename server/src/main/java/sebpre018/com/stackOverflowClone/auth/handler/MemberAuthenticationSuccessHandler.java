package sebpre018.com.stackOverflowClone.auth.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.repository.MemberRepository;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private MemberRepository memberRepository;

    public MemberAuthenticationSuccessHandler(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        log.info("# Authenticated successfully!");

        Member member = memberRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        SuccessMemberInfo successUserInfo = new SuccessMemberInfo(HttpStatus.ACCEPTED.value(), member.getMemberId(), member.getEmail(), member.getUserName(), member.getAboutMe());
        String responseInfo = new Gson().toJson(successUserInfo);

        response.setCharacterEncoding("utf-8");
        response.setStatus(HttpStatus.ACCEPTED.value());
        response.getWriter().write(responseInfo);
    }
}

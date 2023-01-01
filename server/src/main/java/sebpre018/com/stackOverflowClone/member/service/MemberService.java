package sebpre018.com.stackOverflowClone.member.service;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.auth.utils.CustomAuthorityUtils;
import sebpre018.com.stackOverflowClone.auth.utils.MemberRegistrationApplicationEvent;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.repository.MemberRepository;
import sebpre018.com.stackOverflowClone.util.CustomBeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final ApplicationEventPublisher publisher;


    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, ApplicationEventPublisher publisher) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.publisher = publisher;
    }

    //회원가입,  회원정보 조회, 회원 정보 수정, 탈퇴
    //아이디 찾기
    public Member createMember(Member member) {
        Optional<Member> verifiedUser = memberRepository.findByEmail(member.getEmail());
        if (verifiedUser.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_EXISTS);

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);
        Member savedMember = memberRepository.save(member);

        publisher.publishEvent(new MemberRegistrationApplicationEvent(savedMember));
        return savedMember;
    }

    //로그인된 유저 정보 조회
    public Member getLoginMember() { // 로그인된 유저 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousMEMBER"))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional<Member> optionalUser = memberRepository.findByEmail(authentication.getName());
        Member member = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        System.out.println("HERE:"+member.getMemberId());

        return member;
    }

    public List<Member> findAll() {
        return new ArrayList<>(memberRepository.findAll());
    }

    public Member updateMember(Member member,long id) {
        Member verifiedUser = findVerifiedMember(id);
//        verifiedUser.setEmail(member.getEmail());
        verifiedUser.setUsername(member.getUsername());
        verifiedUser.setAboutMe(member.getAboutMe());
        return memberRepository.save(verifiedUser);
    }
    public Member findMember(long id) {
        return findVerifiedMember(id);
    }

    public Page<Member> findMembers(int page, int size) {
        return memberRepository.findAll(PageRequest.of(page, size,
                Sort.by("id").descending()));
    }

    public void deleteMember(long id) {
        Member findMember = findVerifiedMember(id);

        memberRepository.delete(findMember);
    }

    public Member findVerifiedMember(long id) {
        Optional<Member> optionalMember =
                memberRepository.findById(id);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }
}

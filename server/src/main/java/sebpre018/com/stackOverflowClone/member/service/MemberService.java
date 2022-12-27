package sebpre018.com.stackOverflowClone.member.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import sebpre018.com.stackOverflowClone.exception.BusinessLogicException;
import sebpre018.com.stackOverflowClone.exception.ExceptionCode;
import sebpre018.com.stackOverflowClone.member.entity.Member;
import sebpre018.com.stackOverflowClone.member.repository.MemberRepository;
import sebpre018.com.stackOverflowClone.util.CustomBeanUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.transaction.Transactional;
import java.awt.*;
import java.util.List;
import java.util.Optional;


@Transactional
@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final CustomBeanUtils<Member> beanUtils;

    public MemberService(MemberRepository memberRepository, CustomBeanUtils<Member> beanUtils) {
        this.memberRepository = memberRepository;
        this.beanUtils = beanUtils;
    }

    //회원가입,  회원정보 조회, 회원 정보 수정, 탈퇴
    //아이디 찾기
    public Member createMember(Member member) {
        // 이미 등록된 이메일인지 확인
        verifyExistsEmail(member.getEmail());

        return memberRepository.save(member);
    }

    //로그인된 유저 정보 조회
    public Member getLoginMember() { // 로그인된 유저 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication == null || authentication.getName() == null || authentication.getName().equals("anonymousMEMBER"))
            throw new BusinessLogicException(ExceptionCode.UNAUTHORIZED);

        Optional<Member> optionalUser = memberRepository.findByEmail(authentication.getName());
        Member member = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return member;
    }
gg
    public Member updateMember(Member member) {
        Member findMember = findVerifiedMember(member.getId());

        beanUtils.copyNonNullProperties(member, findMember);

        return memberRepository.save(findMember);
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

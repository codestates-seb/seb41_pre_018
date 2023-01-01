package sebpre018.com.stackOverflowClone.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import sebpre018.com.stackOverflowClone.auth.filter.JwtAuthenticationFilter;
import sebpre018.com.stackOverflowClone.auth.filter.JwtVerificationFilter;
import sebpre018.com.stackOverflowClone.auth.handler.MemberAccessDeniedHandler;
import sebpre018.com.stackOverflowClone.auth.handler.MemberAuthenticationEntryPoint;
import sebpre018.com.stackOverflowClone.auth.handler.MemberAuthenticationFailureHandler;
import sebpre018.com.stackOverflowClone.auth.handler.MemberAuthenticationSuccessHandler;
import sebpre018.com.stackOverflowClone.auth.jwt.JwtTokenizer;
import sebpre018.com.stackOverflowClone.auth.utils.CustomAuthorityUtils;
import sebpre018.com.stackOverflowClone.member.repository.MemberRepository;

@Configuration
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeRequests(authorize -> authorize
                        .antMatchers(HttpMethod.GET, "/members/emailCheck/*").permitAll()//이메일 중복 체크
                        .antMatchers(HttpMethod.POST, "/members/").permitAll() // 회원 가입
                        .antMatchers(HttpMethod.GET, "/members/*/Info").permitAll() // 회원 상세 정보 조회
                        .antMatchers(HttpMethod.GET, "/members/**").hasAnyRole("USER", "ADMIN") // 회원 조회
                        .antMatchers(HttpMethod.DELETE, "/members/**").hasRole("USER") // 회원 삭제
                        .antMatchers(HttpMethod.POST, "/questions/").hasRole("USER") // 질문 등록
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER") // 질문 편집
                        .antMatchers(HttpMethod.POST, "/answers/**").hasRole("USER") // 답변 생성
                        .antMatchers(HttpMethod.PATCH, "/answers/**").hasRole("USER") // 답변 수정
                        .antMatchers(HttpMethod.POST, "/vote/**").hasRole("USER") // 투표
                        .antMatchers(HttpMethod.DELETE).hasRole("USER") // 질문, 답변 삭제
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {

        @Override
        public void configure(HttpSecurity builder) throws Exception {

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/members/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(memberRepository));
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}

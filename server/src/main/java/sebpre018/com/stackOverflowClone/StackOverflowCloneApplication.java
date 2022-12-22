package sebpre018.com.stackOverflowClone;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing //audit(BaseEntity) 사용에 필요
@SpringBootApplication
public class StackOverflowCloneApplication {

	public static void main(String[] args) {
		SpringApplication.run(StackOverflowCloneApplication.class, args);
	}

}

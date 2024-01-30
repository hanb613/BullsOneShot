package com.fire.oneshot.cert.service;

import com.fire.oneshot.auth.domain.User;
import com.fire.oneshot.auth.repository.UserRepository;
import com.fire.oneshot.cert.domain.Certification;
import com.fire.oneshot.cert.dto.CertContent;
import com.fire.oneshot.cert.dto.CertCreateDto;
import com.fire.oneshot.cert.repository.CertRepository;
import com.fire.oneshot.global.exception.CertErrorCode;
import com.fire.oneshot.global.exception.CertException;
import com.fire.oneshot.global.exception.UserErrorCode;
import com.fire.oneshot.global.exception.UserException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CertServiceImpl implements CertService {

    private final UserRepository userRepository;
    private final CertRepository certRepository;

    @Override
    public void create(String userId, CertCreateDto certCreateDto) {

        String type = certCreateDto.getCertName();
        CertContent certContent = CertContent.valueOf(type);
        Certification cert = Certification.builder()
                .certName(certContent.getTitle())
                .certContent(certContent.getContent())
                .trainingHour(certContent.getHour())
                .getTime(LocalDateTime.now()).build();

        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserException(UserErrorCode.NO_MATCHING_USER);
        } else {
            cert.setUser(user.get());
            certRepository.save(cert);
        }
    }

    @Override
    public Certification getCert(Long certId) {
        Optional<Certification> cert = certRepository.findById(certId);
//        log.debug("수료증 정보 {}", cert.get().getCertContent());
        if (cert.isEmpty()) {
            throw new CertException(CertErrorCode.NO_CERT_FIND);
        } else {
            return cert.get();
        }
    }

    @Override
    public List<Certification> getCertList(String userId) {
        Optional<List<Certification>> certList = certRepository.findAllByUserId(userId);
        return certList.get();
    }
}

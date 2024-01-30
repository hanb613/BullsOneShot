package com.fire.oneshot.cert.service;

import com.fire.oneshot.cert.domain.Certification;
import com.fire.oneshot.cert.dto.CertCreateDto;

import java.util.List;

public interface CertService {


    void create(String userId, CertCreateDto certCreateDto);

    Certification getCert(Long certId);

    List<Certification> getCertList(String userId);
}

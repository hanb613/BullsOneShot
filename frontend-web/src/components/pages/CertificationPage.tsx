import { images } from '@constants/images';
import { useNavigate } from 'react-router';
import { useCallback, useState, useEffect } from 'react';
import CertificationListCard from '@components/certification/CertificationListCard';
import { CertificationType } from '@/types/certification/certification.type';
import { getCertList } from '@apis/certificateApi';
import useToastList from '@hooks/useToastList';
import { useSetRecoilState } from 'recoil';
import { ToastMessageState } from '@atom/toastAtom';

const CertificationPage = () => {
  const navigate = useNavigate();
  const [basicCertInfo, setBasicCertInfo] = useState<CertificationType>({
    certName: '화재 대비 기기 교육 과정 수료',
    certContent: '화재 대비 기기 교육 과정을 수료하였음을 인증합니다.',
  });
  const [realCertInfo, setRealCertInfo] = useState<CertificationType>({
    certName: '실전 시뮬레이션 과정 수료',
    certContent: '실전 시뮬레이션 과정을 수료하였음을 인증합니다.',
  });
  const { show } = useToastList();
  const setToastMessage = useSetRecoilState(ToastMessageState);

  const toastErrorGetList = useCallback(() => {
    setToastMessage((prev) => {
      return {
        ...prev,
        error: '수료증 정보를 불러오는데 실패하였습니다.',
      };
    });
    show('error');
  }, [setToastMessage, show]);

  useEffect(() => {
    getCertList()
      .then((res) => {
        console.log('수료증 리스트 요청 결과 : ', res);
        if (res.success) {
          res.response.map((cert) => {
            if (cert.certName === '화재 대비 기기 교육 과정') {
              console.log('화재 대비 기기 교육 과정');

              setBasicCertInfo((prev) => ({
                ...prev,
                getTime: cert.getTime?.substring(0, 10),
                certId: cert.certId,
              }));
            }
            if (cert.certName === '실전 시뮬레이션 과정') {
              setRealCertInfo((prev) => ({
                ...prev,
                getTime: cert.getTime?.substring(0, 10),
                certId: cert.certId,
              }));
            }
          });
        } else {
          toastErrorGetList();
        }
      })
      .catch((err) => {
        console.error('수료증 리스트 불러오기 실패', err);
        toastErrorGetList();
      });
  }, [toastErrorGetList]);

  const handleHomeButton = useCallback(() => {
    navigate('/home');
  }, [navigate]);

  return (
    <div
      className='w-full h-full bg-no-repeat relative'
      style={{
        backgroundImage: `url(${images.background.home})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='w-full h-full py-[50px] flex flex-col items-center justify-between bg-black bg-opacity-40 relative'>
        <div className='w-full flex flex-row px-[50px] items-center'>
          <button onClick={handleHomeButton}>
            <img
              className='w-[70px] h-[70px]'
              src={images.icon.home}
              alt='홈 버튼'
            />
          </button>
          <p className='text-[40px] text-white font-black ml-[40px]'>
            나의 수료증
          </p>
        </div>

        <CertificationListCard cert={basicCertInfo} />
        <CertificationListCard cert={realCertInfo} />
      </div>
    </div>
  );
};

export default CertificationPage;

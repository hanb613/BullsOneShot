import { images } from '@constants/images';
import { useNavigate, useParams } from 'react-router';
import { useEffect, useState, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { getCertDetail } from '@apis/certificateApi';
import { CertificationType } from '@/types/certification/certification.type';
import useToastList from '@hooks/useToastList';
import { useSetRecoilState } from 'recoil';
import { ToastMessageState } from '@atom/toastAtom';
import CertificationMovingCard from '@components/certification/CertificationMovingCard';
import CertificateImage from '@components/certification/CertificateImage';

const CertificationDetailPage = () => {
  const { cert_id } = useParams();
  const navigate = useNavigate();
  const [certDetailInfo, setCertDetailInfo] = useState<CertificationType>();
  const { show } = useToastList();
  const setToastMessage = useSetRecoilState(ToastMessageState);
  const divRef = useRef<HTMLDivElement>(null);
  const user = localStorage.getItem('userName');

  const handleDownload = async () => {
    if (!divRef.current) return;
    if (!certDetailInfo) return;
    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, `${user}의 ${certDetailInfo.certName} 수료증.png`);
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const toastErrorGetInfo = useCallback(() => {
    setToastMessage((prev) => {
      return {
        ...prev,
        error: '수료증 정보를 불러오는데 실패하였습니다.',
      };
    });
    show('error');
  }, [setToastMessage, show]);

  useEffect(() => {
    if (cert_id) {
      getCertDetail(Number(cert_id))
        .then((res) => {
          if (res.success) {
            console.log('수료증 상세정보 요청 결과 : ', res);
            setCertDetailInfo(res.response);
          } else {
            toastErrorGetInfo();
          }
        })
        .catch((err) => {
          console.error('수료증 상세정보 불러오기 실패', err);
          toastErrorGetInfo();
        });
    }
  }, [cert_id, toastErrorGetInfo]);

  useEffect(() => {
    setCertDetailInfo({
      certId: cert_id,
      certName: '화재 대비 기기교육 과정',
      certContent:
        '위 교육생은 불속에서 살아남기 기본 튜토리얼 과정을 수료하였기에\n이 수료증을 수여합니다.',
      getTime: '2023-11-07',
      trainingHour: 1,
      userId: 'abcd',
    });
  }, [cert_id]);

  return (
    <div
      className='w-full h-full bg-no-repeat relative overflow-hidden'
      style={{
        backgroundImage: `url(${images.background.home})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='w-full h-full pt-[50px] pb-[80px] flex flex-col items-center justify-between bg-black bg-opacity-40 relative'>
        <div className='w-full flex flex-row px-[50px]'>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            <img
              className='w-[70px] h-[70px]'
              src={images.icon.back}
              alt='뒤로가기 버튼'
            />
          </button>
        </div>
        {certDetailInfo && (
          <div className='w-full flex flex-col items-center relative'>
            <div className='w-[985px] h-[720px]'>
              <button onClick={handleDownload}>
                <div className='absolute z-50'>
                  <CertificationMovingCard>
                    <CertificateImage cert={certDetailInfo} />
                  </CertificationMovingCard>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
      {certDetailInfo && (
        <div className=''>
          <CertificateImage cert={certDetailInfo} divRef={divRef} />
        </div>
      )}
    </div>
  );
};

export default CertificationDetailPage;

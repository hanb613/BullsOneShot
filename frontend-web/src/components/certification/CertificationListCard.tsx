import { CertificationType } from '@/types/certification/certification.type';
import { images } from '@constants/images';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';
import useToastList from '@hooks/useToastList';
import { useSetRecoilState } from 'recoil';
import { ToastMessageState } from '@atom/toastAtom';
import { motion } from 'framer-motion';

type Props = {
  cert: CertificationType;
};

const CertificationListCard = ({ cert }: Props) => {
  const navigate = useNavigate();
  const done = cert.certId ? true : false;
  const isBasic =
    cert.certName === '화재 대비 기기 교육 과정 수료' ? true : false;
  const { show } = useToastList();
  const setToastMessage = useSetRecoilState(ToastMessageState);

  const handleCertClick = useCallback(() => {
    if (cert.certId) {
      navigate(`/certification-detail/${cert.certId}`);
    } else {
      setToastMessage((prev) => {
        return {
          ...prev,
          error: '수료증 정보를 불러오는데 실패하였습니다.',
        };
      });
      show('error');
    }
  }, [cert.certId, navigate, setToastMessage, show]);

  return (
    <motion.div
      className='w-9/12 h-[300px] relative'
      whileHover={done ? { scale: 1.05 } : {}}
      whileTap={done ? { scale: 0.9 } : {}}
      transition={done ? { type: 'spring', stiffness: 150, damping: 10 } : {}}
    >
      <button
        className={`w-full h-full ${done ? '' : 'cursor-not-allowed'}`}
        onClick={done ? handleCertClick : () => {}}
      >
        <div
          className='w-full h-full flex flex-row items-start bg-primary-light100 rounded-[20px] relative'
          style={{
            filter: `${
              done ? 'drop-shadow(0px 0px 40px rgba(250, 246, 255, 0.50))' : ''
            }`,
          }}
        >
          {!done && (
            <div className='w-full h-full flex items-center justify-center bg-black bg-opacity-50 absolute rounded-[20px]'>
              <img
                className='w-[70px] h-[70px]'
                src={images.icon.lock}
                alt='잠금 아이콘'
              />
            </div>
          )}
          <img
            className='w-[260px] h-[260px] mr-[50px] ml-[40px]'
            src={isBasic ? images.icon.basicmedal : images.icon.realmedal}
            alt='수료증 메달 아이콘'
          />
          <div className='felx-1 flex flex-col w-full h-full py-[50px] pr-[40px] justify-between items-start'>
            <p className='text-[48px] font-black'>{cert.certName}</p>
            <p className='text-[30px] font-semibold'>{cert.certContent}</p>
            <p className='text-[30px] font-semibold ml-auto'>
              {cert.getTime ? cert.getTime : ''}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default CertificationListCard;

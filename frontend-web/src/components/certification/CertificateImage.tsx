import { useState, useCallback, useEffect } from 'react';
import { images } from '@constants/images';
import useToastList from '@hooks/useToastList';
import { useSetRecoilState } from 'recoil';
import { ToastMessageState } from '@atom/toastAtom';
import { CertificationType } from '@/types/certification/certification.type';
import { motion } from 'framer-motion';

type Props = {
  cert: CertificationType;
  divRef?: React.RefObject<HTMLDivElement>;
};

const CertificateImage = ({ cert, divRef }: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const { show } = useToastList();
  const setToastMessage = useSetRecoilState(ToastMessageState);
  const user = localStorage.getItem('userName');

  const handleMouseHover = useCallback(() => {
    setIsHovering((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isHovering) {
      setToastMessage((prev) => {
        return {
          ...prev,
          info: '클릭 시 수료증이 다운됩니다.',
        };
      });
      show('info');
    }
  }, [isHovering, setToastMessage, show]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      className='w-[985px] h-[700px] felx flex-col items-start py-[80px]'
      style={{
        backgroundImage: `url(${images.img.certificate})`,
        backgroundSize: 'cover',
      }}
      onMouseOver={handleMouseHover}
      onMouseOut={handleMouseHover}
      onFocus={handleMouseHover}
      onBlur={handleMouseHover}
      {...(divRef ? { ref: divRef } : {})}
    >
      <p className='font-black text-[55px] text-center'>CERTIFICATE</p>
      <div className='w-full flex flex-row px-[200px] space-x-[40px] mt-[40px]'>
        <div className='felx flex-col space-y-[10px]'>
          <p className='text-[22px] text-start whitespace-pre'>{`교     육     명`}</p>
          <p className='text-[22px] text-start whitespace-pre'>{`훈  련  기  간`}</p>
          <p className='text-[22px] text-start whitespace-pre'>{`이             름`}</p>
        </div>
        <div className='flex flex-col space-y-[10px]'>
          <p className='text-[22px] text-start'>:</p>
          <p className='text-[22px] text-start '>:</p>
          <p className='text-[22px] text-start '>:</p>
        </div>
        <div className='flex flex-col space-y-[10px]'>
          <p className='text-[22px] text-start'>{cert.certName}</p>
          <p className='text-[22px] text-start '>{`${cert.trainingHour} 시간`}</p>
          <p className='text-[22px] text-start '>{user ? user : '알수없음'} </p>
        </div>
      </div>
      <p className='font-semibold text-[24px] mt-[50px] text-center whitespace-pre'>
        {`${cert.certContent?.split('\\n')[0]}\n${cert.certContent?.split(
          '\\n'
        )[1]}`}
      </p>
      <p className='text-[22px] mt-[40px] text-center whitespace-pre'>
        {`${cert.getTime?.substring(0, 10)}`}
      </p>
      <div className='flex flex-row relative items-center justify-center mt-[70px]'>
        <p className='font-black text-[28px] text-center absolute z-20'>
          불속에서 살아남기
        </p>
        <img
          className='w-[80px] h-[80px] absolute z-10 ml-[200px] opacity-80'
          src={images.img.signiture}
          alt='불속에서 살아남기 서명'
        />
      </div>
    </motion.div>
  );
};

export default CertificateImage;

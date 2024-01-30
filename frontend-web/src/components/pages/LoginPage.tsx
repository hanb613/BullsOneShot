import { images } from '@constants/images';
import Lottie from 'lottie-react';
import fireAnimation from '@assets/lotties/fireAnimation.json';
import LoginButton from '@components/login/LoginButton';

const LoginPage = () => {
  return (
    <div
      className='w-full h-full flex flex-col justify-between bg-no-repeat items-center py-[50px] overflow-hidden relative'
      style={{
        backgroundImage: `url(${images.background.login})`,
        backgroundSize: 'cover',
      }}
    >
      <p className='font-jsarirang text-[120px] text-white pt-[20px]'>
        불속에서 살아남기
      </p>

      <Lottie
        animationData={fireAnimation}
        loop
        style={{
          height: '550px',
        }}
      />
      <LoginButton />
    </div>
  );
};

export default LoginPage;

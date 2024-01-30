import { getAccessToken } from '@apis/loginApi';
import { refreshTokenState } from '@atom/userAtom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Lottie from 'lottie-react';
import runningAnimation from '@assets/lotties/runningAnimation.json';
import { motion } from 'framer-motion';
import { images } from '@constants/images';

const LoadingAnimation = {
  start: { scale: 0, opacity: 0.0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: 'spring',
      stiffness: 110,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const InnerAnimation = {
  start: { opacity: 0, x: 100, y: 50 },
  end: { opacity: 1, x: 0, y: 0 },
};

const LoginCallBackPage = () => {
  const navigate = useNavigate();
  // const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  // const setUser = useSetRecoilState(userState);
  const setRefreshToken = useSetRecoilState(refreshTokenState);
  const loginLoadingMsg = ['L', 'O', 'G', 'I', 'N', '.', '.', '.'];

  // 인가 코드 파싱해서 서버에 보내주기
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    const state = params.get('state');

    if (code && state) {
      console.log('네이버 인가 코드 : ', code);
      console.log('상태값 : ', state);

      getAccessToken(code, state)
        .then((res) => {
          if (res.success) {
            localStorage.setItem(
              'com.naver.nid.access_token',
              res.response.accessToken
            );
            localStorage.setItem('userName', res.response.name);
            // setAccessToken({ accessToken: res.response.accessToken });
            // setUser({ name: res.response.name });
            setRefreshToken({ refreshToken: res.response.refreshToken });
            // 유저 정보 저장 -> 홈으로 이동
            navigate('/home');
          } else {
            alert(res.error.message);
            navigate('/login');
          }
          console.log('서버에 로그인 요청 성공 결과 : ', res);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
          navigate('/login');
        });
    }
  }, [navigate, setRefreshToken]);

  return (
    <div
      className='w-full h-full flex flex-col items-center justify-center overflow-hidden'
      style={{
        backgroundImage: `url(${images.background.login})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50'>
        <div className='flex flex-col items-center'>
          <Lottie
            animationData={runningAnimation}
            loop
            style={{ width: '600px', height: '600px' }}
          />
          <motion.div
            className='flex'
            initial='start'
            animate='end'
            variants={LoadingAnimation}
          >
            {loginLoadingMsg.map((msg, index) => (
              <motion.p
                key={index}
                className='mr-[12px] text-[40px] text-white font-semibold'
                variants={InnerAnimation}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 2.6,
                }}
              >
                {msg}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginCallBackPage;

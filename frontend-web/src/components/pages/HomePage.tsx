import HomeOptionButton from '@components/home/HomeOptionButton';
import HomeSimulationButton from '@components/home/HomeSimulationButton';
import { images } from '@constants/images';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [isVolumeOn, setIsVolumeOn] = useState(true);
  // const setAccessToken = useSetRecoilState(accessTokenState);
  const user = localStorage.getItem('userName');

  const handleVolumeButton = useCallback(() => {
    setIsVolumeOn((prev) => !prev);
  }, []);

  const handleLogoutButton = useCallback(() => {
    localStorage.removeItem('com.naver.nid.access_token');
    localStorage.removeItem('userName');
    // setAccessToken(null);
    // setUser(null);
    navigate('/login');
  }, [navigate]);

  return (
    <div
      className='w-full h-full flex flex-col bg-no-repeat relative'
      style={{
        backgroundImage: `url(${images.background.home})`,
        backgroundSize: 'cover',
      }}
    >
      <div className='w-full p-[50px] flex flex-row justify-between items-start'>
        <div className='flex flex-row items-center'>
          <p className='text-[40px] font-bold text-white'>
            {user ? user : '알수없음'}
          </p>
          <p className='text-[40px] pl-[10px] font-bold text-white opacity-60'>
            님의 마을
          </p>
        </div>
        <motion.div
          animate={{ rotateY: isVolumeOn ? -180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 40 }}
          style={{
            zIndex: isVolumeOn ? 0 : 1,
          }}
        >
          <button onClick={handleVolumeButton}>
            <img
              className='w-[70px] h-[70px]'
              src={isVolumeOn ? images.icon.volumeon : images.icon.volumeoff}
              alt='볼륨 버튼'
            />
          </button>
        </motion.div>
      </div>

      <div className='flex-1 w-full flex flex-row px-[150px] justify-between items-end'>
        <HomeSimulationButton
          width={640}
          height={422}
          marginBottom={85}
          backgroundImg={images.img.basichouse}
          discription='화재 대비 기기 교육'
          handleButton={() => {
            navigate('/basic-simulation');
          }}
        />
        <HomeSimulationButton
          width={820}
          height={610}
          marginBottom={40}
          backgroundImg={images.img.realhouse}
          discription='실제 상황 시뮬레이션'
          handleButton={() => {
            navigate('/real-simulation');
          }}
        />

        <div
          className='flex flex-col absolute z-10 h-[392px] right-[130px] bottom-[50px] bg-no-repeat items-center'
          style={{
            backgroundImage: `url(${images.icon.bar})`,
            backgroundSize: 'contain',
          }}
        >
          <HomeOptionButton
            backgroundImg={images.icon.certification}
            description='수료증 버튼'
            handleButton={() => {
              navigate('/certification');
            }}
          />
          <HomeOptionButton
            backgroundImg={images.icon.logout}
            description='로그아웃 버튼'
            handleButton={handleLogoutButton}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

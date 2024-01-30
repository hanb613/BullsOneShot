import { Unity, useUnityContext } from 'react-unity-webgl';
import Lottie from 'lottie-react';
import fireAnimation from '@assets/lotties/fireAnimation.json';
import loadingTextAnimation from '@assets/lotties/loadingTextAnimation.json';
import { images } from '@constants/images';
// import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback, useRef } from 'react';
import MotionCam from '@components/motion/MotionCam';
import * as StompJs from '@stomp/stompjs';
import { activateClient, getClient } from '@utils/socket';
import useToastList from '@hooks/useToastList';
import { useSetRecoilState } from 'recoil';
import { ToastMessageState } from '@atom/toastAtom';
import { issueCert } from '@apis/certificateApi';
import { ReactUnityEventParameter } from 'react-unity-webgl/distribution/types/react-unity-event-parameters';

const BasicSimulationPage = () => {
  const clientRef = useRef<StompJs.Client>();
  // const navigate = useNavigate();
  const { show } = useToastList();
  const setToastMessage = useSetRecoilState(ToastMessageState);
  const [isStand, setIsStand] = useState(false);
  const [isWalk, setIsWalk] = useState(false);
  const [isBell, setIsBell] = useState(false);
  const {
    unityProvider,
    sendMessage,
    isLoaded,
    addEventListener,
    removeEventListener,
  } = useUnityContext({
    loaderUrl: 'BasicBuild/BasicBuild.loader.js',
    dataUrl: 'BasicBuild/BasicBuild.data.unityweb',
    frameworkUrl: 'BasicBuild/BasicBuild.framework.js.unityweb',
    codeUrl: 'BasicBuild/BasicBuild.wasm.unityweb',
  });

  const quitUnityBuild = useCallback((page: string) => {
    window.location.href = `/${page}`;
  }, []);

  const toastErrorIssueCert = useCallback(() => {
    setToastMessage((prev) => {
      return {
        ...prev,
        error: '수료증 발급을 실패하였습니다.',
      };
    });
    show('error');
    quitUnityBuild('home');
  }, [quitUnityBuild, setToastMessage, show]);

  const setComplete = useCallback(
    (value: ReactUnityEventParameter) => {
      if (value === 1) {
        issueCert('화재대비')
          .then((res) => {
            if (res.success) {
              setToastMessage((prev) => {
                return {
                  ...prev,
                  success: '수료증이 발급되었습니다.',
                };
              });
              show('success');
              quitUnityBuild('certification');
            } else {
              toastErrorIssueCert();
            }
          })
          .catch((err) => {
            console.error('수료증 리스트 불러오기 실패', err);
            toastErrorIssueCert();
          });
      }
    },
    [quitUnityBuild, setToastMessage, show, toastErrorIssueCert]
  );

  // 소켓 연결
  useEffect(() => {
    clientRef.current = getClient();
    activateClient(clientRef.current);
    clientRef.current.onConnect = () => {
      clientRef.current?.subscribe('/topic/socket', (res) => {
        console.log(res.body);

        const message = res.body;

        if (message === 'isTrue') {
          setIsBell(true);
        } else {
          setIsBell(false);
        }
      });
    };

    // 구독 취소
    return () => {
      clientRef.current?.unsubscribe('/sub/lobby');
    };
  }, []);

  // unity에 정보 전달
  useEffect(() => {
    const data = JSON.stringify({
      nickName: localStorage.getItem('userName'),
      isStand: isStand,
      isWalk: isWalk,
      isBell: isBell,
    });
    sendMessage('StateManager', 'SaveStateInfo', data);
  }, [isBell, isStand, isWalk, sendMessage]);

  // unity로부터 정보 받기
  useEffect(() => {
    addEventListener('SendComplete', setComplete);
    return () => {
      removeEventListener('UnityCall', setComplete);
    };
  }, [addEventListener, removeEventListener, setComplete]);

  return (
    <div className='w-full h-full flex flex-col items-center justify-center bg-gray-900'>
      <div className='w-full flex flex-row px-[25px] pt-[25px] items-center'>
        <button
          onClick={() => {
            quitUnityBuild('home');
          }}
        >
          <img
            className='w-[70px] h-[70px]'
            src={images.icon.back}
            alt='뒤로가기 버튼'
          />
        </button>
        <p className='text-[40px] text-white font-black ml-[40px]'>
          화재 대비 기기 교육
        </p>
      </div>
      <div className='flex-1 flex flex-col items-center justify-center'>
        {!isLoaded && (
          <div className='flex flex-col items-center absolute'>
            <Lottie
              animationData={fireAnimation}
              loop
              style={{
                height: '550px',
              }}
            />
            <Lottie
              animationData={loadingTextAnimation}
              loop
              style={{ width: '250px' }}
            />
          </div>
        )}
        <div className='w-[1440px] h-[810px] relative'>
          <Unity
            unityProvider={unityProvider}
            style={{ width: '1440px', height: '810px' }}
          />
          {isLoaded && (
            <MotionCam
              setIsStandTrue={() => {
                setIsStand(true);
              }}
              setIsStandFalse={() => {
                setIsStand(false);
              }}
              setIsWalkTrue={() => {
                setIsWalk(true);
              }}
              setIsWalkFalse={() => {
                setIsWalk(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicSimulationPage;

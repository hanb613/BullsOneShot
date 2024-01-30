import { useEffect, useRef } from 'react';
import { Webcam, drawKeypoints, drawSkeleton } from '@teachablemachine/pose';
import {
  CustomPoseNet,
  load,
} from '@teachablemachine/pose/dist/custom-posenet';

type Props = {
  setIsStandTrue: () => void;
  setIsStandFalse: () => void;
  setIsWalkTrue: () => void;
  setIsWalkFalse: () => void;
};

interface Pose {
  keypoints: Array<{
    part: string;
    position: {
      x: number;
      y: number;
    };
    score: number;
  }>;
}

const MotionCam = ({
  setIsStandTrue,
  setIsStandFalse,
  setIsWalkTrue,
  setIsWalkFalse,
}: Props) => {
  const modelRef = useRef<CustomPoseNet | null>(null);
  const webcamRef = useRef<Webcam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const labelContainerRef = useRef<HTMLDivElement | null>(null);
  const maxPredictionsRef = useRef<number | null>(null);

  const init = async () => {
    const URL = `/my-pose-model/`;
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    modelRef.current = await load(modelURL, metadataURL);
    maxPredictionsRef.current = modelRef.current.getTotalClasses();

    const size = 200;
    const flip = true;

    webcamRef.current = new Webcam(size, size, flip);
    await webcamRef.current.setup();
    await webcamRef.current.play();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = size;
      canvas.height = size;
    }

    window.requestAnimationFrame(loop);

    labelContainerRef.current = document.getElementById(
      'label-container'
    ) as HTMLDivElement;
    if (labelContainerRef.current) {
      for (let i = 0; i < maxPredictionsRef.current; i++) {
        labelContainerRef.current.appendChild(document.createElement('div'));
      }
    }
  };

  const loop = () => {
    if (webcamRef.current) {
      webcamRef.current.update();
    }
    predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    if (webcamRef.current && modelRef.current) {
      const { pose, posenetOutput } = await modelRef.current.estimatePose(
        webcamRef.current.canvas
      );
      const prediction = await modelRef.current.predict(posenetOutput);

      if (maxPredictionsRef.current) {
        for (let i = 0; i < maxPredictionsRef.current; i++) {
          if (prediction[i].className === 'bending') {
            if (prediction[i].probability > 0.85) {
              setIsStandFalse();
            } else {
              setIsStandTrue();
            }
          }
        }
      }

      // 관절 값으로 로직짜기~
      // if (Math.abs(pose.keypoints[11].position.x - pose.keypoints[13].position.x) > 15) {
      //   setIsWalkTrue()
      // }
      isWalking(pose.keypoints);

      drawPose(pose);
    }
  };
  const isWalking = (keypoints: Pose['keypoints']) => {
    const left = keypoints.filter(
      (point) =>
        point.part === 'leftHip' ||
        point.part === 'leftKnee' ||
        point.part === 'leftAnkle'
    );

    const left_degree = check(left);
    const right = keypoints.filter(
      (point) =>
        point.part === 'rightHip' ||
        point.part === 'rightKnee' ||
        point.part === 'rightAnkle'
    );
    const right_degree = check(right);

    if (left_degree >= 15 || right_degree >= 15) {
      setIsWalkTrue();
    } else {
      setIsWalkFalse();
    }
  };

  const check = (keypoints: Pose['keypoints']) => {
    if (!keypoints[0] || !keypoints[1] || !keypoints[2]) {
      return 0;
    }
    if (
      keypoints[0].score < 0.5 ||
      keypoints[1].score < 0.5 ||
      keypoints[2].score < 0.5
    ) {
      return 0;
    }

    const r =
      ((keypoints[0].position.x - keypoints[1].position.x) ** 2 +
        (keypoints[0].position.y - keypoints[1].position.y) ** 2) **
      0.5;
    const l = Math.abs(keypoints[0].position.y - keypoints[1].position.y);
    const radian = Math.acos(l / r);
    const degree = (radian * 180) / Math.PI;

    return degree;
  };

  const drawPose = (pose: Pose) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (webcamRef.current && canvas && ctx) {
      ctx.drawImage(webcamRef.current.canvas, 0, 0);

      // 모션을 인식해 웹캠상에서 좌표를 그리는 코드
      if (pose) {
        const minPartConfidence = 0.5;
        drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
    }
  };

  useEffect(() => {
    init();

    return () => {
      if (webcamRef.current) {
        webcamRef.current.stop();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='right-0 bottom-0 absolute z-20'>
      <canvas id='canvas' ref={canvasRef}></canvas>
    </div>
  );
};

export default MotionCam;

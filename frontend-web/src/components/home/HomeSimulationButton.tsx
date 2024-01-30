import { motion } from 'framer-motion';

type Props = {
  width: number;
  height: number;
  marginBottom: number;
  backgroundImg: string;
  discription: string;
  handleButton: () => void;
};

const HomeSimulationButton = ({
  width,
  height,
  marginBottom,
  backgroundImg,
  discription,
  handleButton,
}: Props) => {
  return (
    <motion.div
      className='flex flex-col items-center justify-center'
      style={{
        width: width,
        height: height,
        marginBottom: marginBottom,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <button onClick={handleButton}>
        <img
          style={{
            filter: 'drop-shadow(0px 0px 40px rgba(255, 255, 255, 0.50))',
          }}
          src={backgroundImg}
          alt={`${discription} 버튼`}
        />
      </button>
      <p className='absolute text-[40px] font-semibold text-white'>
        {discription}
      </p>
    </motion.div>
  );
};

export default HomeSimulationButton;

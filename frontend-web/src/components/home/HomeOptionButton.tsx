import { motion } from 'framer-motion';

type Props = {
  backgroundImg: string;
  description: string;
  handleButton: () => void;
};

const HomeOptionButton = ({
  backgroundImg,
  description,
  handleButton,
}: Props) => {
  return (
    <motion.div
      className='w-[175px] h-[75px] mt-[30px]'
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <button onClick={handleButton}>
        <img src={backgroundImg} alt={description} />
      </button>
    </motion.div>
  );
};

export default HomeOptionButton;

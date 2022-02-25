import React from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';
import { ReactComponent as CloseIcon } from 'components/atoms/icon/x-close.svg';
import { Card } from 'components/molecules';

const LestCard = ({ data }) => {
  const [state, setState] = React.useState({});
  const [selectedId, setSelectedId] = React.useState(null);
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 7,
        position: 'relative',
      }}
    >
      {data?.map((item, i) => (
        <motion.div
          layoutId={item.id}
          key={i}
          // component={motion.div}
        >
          <Card
            icon
            name={item?.name}
            src={item?.image}
            birthDate={item?.created}
            onClick={() => {
              setState(item);
              setSelectedId(item.id);
            }}
          >
            <p>{item.name}</p>
          </Card>
        </motion.div>
      ))}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{
              backgroundColor: '#f1eaea',
              border: 'solid 1px',
              position: 'absolute',
              top: '15%',
              left: '30%',
              padding: 10,
              borderRadius: 5,
            }}
            layoutId={selectedId}
          >
            <CloseIcon
              style={{ cursor: 'pointer', width: 24, height: 24 }}
              onClick={() => setSelectedId(null)}
            />
            <div style={{ display: 'flex', gap: 10 }}>
              <img
                src={state?.image}
                alt={state?.name}
                style={{ width: 200, height: 225 }}
              />
              <div>
                <p>Name: {state?.name}</p>
                <p>Species: {state?.species}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
LestCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape),
};

export default LestCard;

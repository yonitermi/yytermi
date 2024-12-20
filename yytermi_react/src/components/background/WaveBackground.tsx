import { useSpring, animated } from '@react-spring/web'; 
export const WaveBackground = () => {
  const props = useSpring({
    from: { transform: 'translateY(0px)' },
    to: async (next) => {
      while (1) {
        await next({ transform: 'translateY(20px)' });
        await next({ transform: 'translateY(0px)' });
      }
    },
    config: {
      duration: 3000,
    },
  });

  return (
    <animated.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, rgba(0, 0, 51, 0.3), rgba(0, 0, 0, 0.3))',
        ...props,
      }}
    />
  );
};
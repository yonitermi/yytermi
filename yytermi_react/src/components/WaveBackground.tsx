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
        background: 'linear-gradient(45deg, rgba(66, 135, 245, 0.3), rgba(200, 80, 192, 0.3))',
        ...props,
      }}
    />
  );
};
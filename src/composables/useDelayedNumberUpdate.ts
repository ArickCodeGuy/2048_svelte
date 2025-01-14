export type UseDelayedNumberUpdateOptions = {
  /** milliseconds */
  transitionDuration: number;
  /** How many times per second to update. **Don't use 0** */
  tickrate: number;
  /** Callback called on each animation function call */
  onAnimate: (v: number) => number;
  /** Log all funciton calls with state */
  debug: boolean;
};

type Updater = number | ((oldV: number) => number);

export const DEFAULT_OPTIONS: UseDelayedNumberUpdateOptions = {
  transitionDuration: 500,
  tickrate: 60,
  onAnimate: () => 0,
  debug: false,
};

/**
 * Smooth animation of changing number.
 *
 * Rounds displayed number to int
 */
export const useDelayedNumberUpdate = (
  defaultValue: number,
  userOptions: Partial<UseDelayedNumberUpdateOptions> = {}
) => {
  const options = {
    ...DEFAULT_OPTIONS,
    ...userOptions,
  };

  /** Ms between `animation()` call */
  const animationDelay = 1000 / options.tickrate;
  /** Value we animating to */
  let state = defaultValue;
  /** Prev value needed to track what current number is */
  let prevState = state;
  /** Current animation value */
  let animationValue = state;
  let animationTimeout: number | null = null;
  /** Timestamp of animation start */
  let animationStart: number | null = null;

  /** Used only for debugging purposes */
  function getFullState() {
    return JSON.stringify({
      options,
      animationDelay,
      state,
      prevState,
      animationValue,
      animationTimeout,
      animationStart,
    });
  }
  options.debug && console.log('useDelayedNumberUpdate: init', getFullState());

  function updateAnimationValue() {
    options.debug &&
      console.log(
        'useDelayedNumberUpdate: updateAnimationValue',
        getFullState()
      );

    if (!animationStart) {
      animationValue = state;
      return;
    }

    const now = Number(new Date());
    const animationEnd = animationStart + options.transitionDuration;

    // Sometimes goes above 1.
    const diffPercent = Math.min(
      1,
      (now - animationStart) / (animationEnd - animationStart)
    );
    const diff = state - prevState;

    animationValue = Math.round(prevState + diff * diffPercent);
  }

  function resetAnimation() {
    options.debug &&
      console.log('useDelayedNumberUpdate: resetAnimation', getFullState());

    animationValue = state;
    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }
    animationStart = null;
  }

  function animate() {
    options.debug &&
      console.log('useDelayedNumberUpdate: animate', getFullState());

    if (animationTimeout) {
      clearTimeout(animationTimeout);
      animationTimeout = null;
    }

    updateAnimationValue();
    options.onAnimate(animationValue);

    const now = Number(new Date());
    if (!animationStart || now > animationStart + options.transitionDuration) {
      resetAnimation();
      return;
    }

    animationTimeout = setTimeout(() => {
      animate();
    }, animationDelay);
  }

  function updateState(updater: Updater) {
    options.debug &&
      console.log('useDelayedNumberUpdate: updateState', getFullState());

    prevState = animationValue;

    if (typeof updater === 'function') {
      state = updater(state);
    } else {
      state = updater;
    }
    animationStart = Number(new Date());
    animate();
  }

  return [updateState];
};

import { Animated } from 'react-native';

export enum ExtrapolateType {
  extend = 'extend',
  identity = 'identity',
  clamp = 'clamp',
}

export class AnimationHelper {
  static extrapolateType = ExtrapolateType.clamp;

  /** Returns set of 4 monotonically increasing number between min and max */
  static animatedInputRange = (min: number, max: number) => {
    const animatedRange: number[] = [min];
    animatedRange.push(max * 0.3);
    animatedRange.push(max * 0.7);
    animatedRange.push(max);
    return animatedRange;
  };

  /** Cross axis slide, can be used shift along both x and Y axis */
  // @ts-ignore
  static slide = (animated: Animated.AnimatedAddition, start: number, end: number) => {
    return animated.interpolate({
      inputRange: AnimationHelper.animatedInputRange(start, end),
      outputRange: [start, -end * 0.3, -end * 0.7, -end],
      extrapolate: AnimationHelper.extrapolateType,
    });
  };
  // @ts-ignore
  static fadeOut = (animated: Animated.AnimatedAddition, start: number, end: number) => {
    return animated.interpolate({
      inputRange: AnimationHelper.animatedInputRange(start, end),
      outputRange: [1, 0.2, 0.1, 0],
      extrapolate: AnimationHelper.extrapolateType,
    });
  };
  // @ts-ignore
  static fadeIn = (animated: Animated.AnimatedAddition, start: number, end: number) => {
    return animated.interpolate({
      inputRange: AnimationHelper.animatedInputRange(start, end),
      outputRange: [0, 0, 0, 1],
      extrapolate: AnimationHelper.extrapolateType,
    });
  };
  // @ts-ignore
  static shrink = (animated: Animated.AnimatedAddition, start: number, end: number) => {
    return animated.interpolate({
      inputRange: AnimationHelper.animatedInputRange(start, end),
      outputRange: [1, 1, 0.8, 0.6],
      extrapolate: AnimationHelper.extrapolateType,
    });
  };
  // @ts-ignore
  static grow = (animated: Animated.AnimatedAddition, start: number, end: number) => {
    return animated.interpolate({
      inputRange: AnimationHelper.animatedInputRange(start, end),
      outputRange: [1, 1, 1.6, 2],
      extrapolate: AnimationHelper.extrapolateType,
    });
  };
}

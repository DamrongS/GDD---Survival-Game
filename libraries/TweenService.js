class TweenInfo {
  constructor({ duration = 1000, easing = TweenInfo.linear, delay = 0, repeat = 0 } = {}, reverse = false) {
    this.duration = duration; // in milliseconds
    this.easing = easing;     // easing function
    this.delay = delay;       // delay before starting
    this.repeat = repeat;     // number of repeats (-1 for infinite)
    this.reverse = reverse;   // flag to indicate if the tween should reverse
  }

  static linear(t) {
    return t; // simple linear interpolation
  }

  static easeInQuad(t) {
    return t * t;
  }

  static easeOutQuad(t) {
    return t * (2 - t);
  }

  static easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
}

// --- TweenService Class with Reverse ---
class TweenService {
  constructor() {
    this.tweens = [];
  }

  createTween(target, properties, tweenInfo) {
    const tween = {
      target: target,
      startValues: {},
      endValues: properties,
      tweenInfo: tweenInfo,
      startTime: millis() + tweenInfo.delay,
      repeatCount: 0,
      completed: false,
      reversed: false // track if currently reversed
    };

    // store start values
    for (let key in properties) {
      tween.startValues[key] = target[key];
    }

    this.tweens.push(tween);
    return tween;
  }

  update() {
    const now = millis();
    for (let tween of this.tweens) {
      if (tween.completed) continue;

      const elapsed = now - tween.startTime;
      if (elapsed < 0) continue; // delay not finished

      let t = elapsed / tween.tweenInfo.duration;
      if (t > 1) t = 1;

      // determine interpolation direction based on reverse state
      const direction = tween.reversed ? 1 - t : t;

      // update target values
      for (let key in tween.endValues) {
        const start = tween.startValues[key];
        const end = tween.endValues[key];
        tween.target[key] = start + (end - start) * tween.tweenInfo.easing(direction);
      }

      // check if tween finished
      if (elapsed >= tween.tweenInfo.duration) {
        if (tween.tweenInfo.repeat === -1 || tween.repeatCount < tween.tweenInfo.repeat) {
          tween.repeatCount++;
          tween.startTime = now; // reset start time for repeat

          // reverse start and end if reverse flag is true
          if (tween.tweenInfo.reverse) {
            tween.reversed = !tween.reversed;
          }
        } else {
          tween.completed = true;
        }
      }
    }

    // remove completed tweens (optional)
    this.tweens = this.tweens.filter(t => !t.completed);
  }
}
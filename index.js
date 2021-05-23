const refs = {
  days: document.querySelector("span[data-value='days']"),
  hours: document.querySelector("span[data-value='hours']"),
  mins: document.querySelector("span[data-value='mins']"),
  secs: document.querySelector("span[data-value='secs']"),
};

class CountdownTimer {
  constructor({ onTick, targetDate, selector }) {
    this.onTick = onTick;
    this.targetDate = targetDate;
  }
  start() {
    const startTime = this.targetDate;

    setInterval(() => {
      const currentTime = Date.now();
      const restTime = startTime - currentTime;
      const time = this.getTimeComponents(restTime);

      this.onTick(time);
    }, 1000);
  }
  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const countdownTimer = new CountdownTimer({
  targetDate: new Date('Jun 17, 2021'),
  onTick: updateClockFace,
});
countdownTimer.start();
function updateClockFace({ days, hours, mins, secs }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.mins.textContent = `${mins}`;
  refs.secs.textContent = `${secs}`;
}

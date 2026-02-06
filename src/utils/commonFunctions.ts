export const formatTime = (totalSeconds: number): string => {
  if (
    Number.isNaN(totalSeconds) ||
    totalSeconds === undefined ||
    totalSeconds < 0
  ) {
    totalSeconds = 0;
  }

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');

  return totalSeconds >= 3600
    ? `${hours.toString().padStart(2, '0')}:${mm}:${ss}`
    : `${mm}:${ss}`;
};

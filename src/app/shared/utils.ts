// ********** UTILITY functions for emoviz components ********

// converts control point x from polar (cosine) to Cartesian x coordinate
export function polarToCartesianX(theta: number, r: number) {
  const x = r * Math.cos(degreesToRadians(theta));
  // console.log('polarToCartesianX: ', x);
  return x;
}

// converts control point y from polar (sine) to Cartesian y coordinate
export function polarToCartesianY(theta: number, r: number) {
  const y = r * Math.sin(degreesToRadians(theta));
  // console.log('polarToCartesianY: ', y);
  return y;
}

export function degreesToRadians(angleInDegrees: number) {
  return (Math.PI * angleInDegrees) / 180;
}

export function getRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  // The maximum is exclusive and the minimum is inclusive
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
  // The maximum is inclusive and the minimum is inclusive
}

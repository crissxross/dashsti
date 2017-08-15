// ********** UTILITY functions for emoviz components ********

// converts control point x from polar (cosine) to Cartesian x coordinate
export function polarToCartesianX(theta, r) {
  const x = r * Math.cos(degreesToRadians(theta));
  // console.log('polarToCartesianX: ', x);
  return x;
}

// converts control point y from polar (sine) to Cartesian y coordinate
export function polarToCartesianY(theta, r) {
  const y = r * Math.sin(degreesToRadians(theta));
  // console.log('polarToCartesianY: ', y);
  return y;
}

export function degreesToRadians(angleInDegrees) {
  return (Math.PI * angleInDegrees) / 180;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; // The maximum is exclusive and the minimum is inclusive
}

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
}

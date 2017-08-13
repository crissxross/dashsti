// ********** UTILITY functions ********

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

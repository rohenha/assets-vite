export function hasTouchEvent() {
  return ( 'ontouchstart' in window ) || 
    ( navigator.maxTouchPoints > 0 ) ||
    ( navigator.msMaxTouchPoints > 0 );
}
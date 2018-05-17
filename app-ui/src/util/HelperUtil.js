import { List } from 'immutable';
import isEmpty from 'lodash/isEmpty';

//const

/**
 * Abbreviation function for player positions or roles
 * @param pos string
 * @returns {*}
 */
export const abbreviateRole = (pos ) => {
  if(pos === 'goalkeep') {
    return 'GK'
  } else if(pos === 'defence') {
    return 'DF'
  } else if(pos === 'midfield') {
    return 'MD'
  } else if(pos === 'forward') {
    return 'FR'
  }
};

/**
 * A map of player position contants
 *
 * @type {{goalkeep: string, defence: string, midfield: string, forward: string}}
 */
export const PLAYER_POSITION = {
  goalkeep: 'goalkeep',
  defence: 'defence',
  midfield: 'midfield',
  forward: 'forward',
};

export function isObjEmpty(obj = {}) {
  try {
    for (let x in obj) {
      if (obj.hasOwnProperty(x)) return false;
    }
  } catch (e){
    return true;
  }
  return true;
}

/**
 * Merge two list of objects where the first(left) list param serves as a base list
 * Merges list without duplicates
 *
 * @deprecated (use noDupConcat(left, right, filter))
 * @param left Left list
 * @param right Right list
 * @param predicate Filter/comparison function returning boolean
 * @returns {iterator} A differentiated list
 */
export function listDiffLeftRecur<T>(
  left: List<T>,
  right: Array<T>,
  predicate: (l: T, r: T) => boolean = (l: T, r: T) => l === r
): List<T> {
  console.log(left.toArray());
  console.log(right);

  function differentiate<T> (state: List<T> , load: List<T>, buffer: Array<T> = [], index: number = 0): List<T> {
    if (state.get(index) != null && load.every((v, k) => predicate(v, state.get(index)))) {
      console.log('State is not empty');
      return differentiate(state, load, buffer, index++)
    } else if (state.get(index) != null ) {
      console.log('Else state is not empty');
      return differentiate(state, load, List.of(buffer).push(state.get(index)), index++)
    } else {
      return state.concat(load)
    }
  }
  return differentiate(left, List.of(right));
}

/**
 * Merge two list of objects and removes duplicates where the first(left) list param serves as a base list
 * noDupConcat(left, right, filter) removes right duplicates in left and concats the left and right list
 *
 * @param left Left list
 * @param right Right list
 * @param predicate Filter compare function returning boolean. If a compare is true, remove item (opposite of normal)
 * @returns {iterator} A differentiated list
 */
export function noDupConcat<T>(
  left: Array<T> = [],
  right: Array<T> = [],
  predicate: (l: T, r: T) => boolean = (l: T, r: T) => l === r
): Array<T> {
  let buffer: Array<T> = [];

  for(let i = 0; i < left.length; i++){
    if(!right.some(v => predicate(v, left[i]))){
      buffer.push(left[i]);
    }
  }
  return buffer.concat(right);
}

/**
 * type safe merging of item with array and returns Array with no removal of duplicates
 *
 * @param data
 * @param payload
 * @returns {Array}
 */
export const pushOnArray = (data, payload) => {
  const d = Array.from(data);
  d.push(payload);
  return d;
};


/**
 * type safe merging of item with array and returns Array with no removal of duplicates
 *
 * @param data
 * @param payload
 * @param f A transform anonymous function
 * @returns {Array}
 */
export function pushArray<T> (data: Array<T>, payload: T, f: (data: Array<T>, payload: T) => Array<T> = data => data ){
  const d = Array.from(f(data, payload));
  d.push(payload);
  return d;
};

/**
 * @deprecated
 */
export function pushList <T>(data: List<T>, payload: T, f: (data: List<T>, payload: T) => List<T> = (data: List<T>) => data ){
  const refined = typeof f === 'function' ? f(data) : data;
  return refined.push(payload);
};

/**
 * Transforms a number, usually large, to a simple social readable format
 * Transforms 1,000,000 -> 1M, 3,000 to 3k, 3456 -> 3.4k
 *
 * @param num
 * @param digits
 * @returns {string}
 */
export const slashNumber = (num, digits = 1) => {
  const sI = [
    { value: 1E18, symbol: "E" },
    { value: 1E15, symbol: "P" },
    { value: 1E12, symbol: "T" },
    { value: 1E9,  symbol: "G" },
    { value: 1E6,  symbol: "M" },
    { value: 1E3,  symbol: "k" }
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  for (let i = 0; i < sI.length; i++) {
    if (num >= sI[i].value) {
      return (num / sI[i].value).toFixed(digits).replace(rx, "$1") + sI[i].symbol;
    }
  }
  return num.toFixed(digits).replace(rx, "$1");
};


/**
 * Usually used for testing
 * log to console and return data
 * @param data
 * @returns {*}
 */
export const clog = (data) => {
  console.log(data);
  return data;
};

/**
 * Used to adjust size of modals
 *
 * Get width of viewport and adjust size by 500px
 * @param lgWidth
 * @param smWidth
 * @returns {number}
 */
export const modalWidth = (lgWidth: number = 520, smWidth: number = 0) => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  return width < 500 ? (smWidth || width * 0.9) : lgWidth;
};

/**
 * Transforms numbers to readable positions
 * Transforms 1 to 1st, 23 to 23rd, 245 -> 245th
 *
 * Has a bug
 *
 * @param position
 * @returns {*}
 */
export const positionth = (position: number) => {
  const last = parseInt(position.toString().slice(-1));
  if (last === 3) {
    return 'rd'
  } else if (last === 2) {
    return 'nd'
  } else if (last === 1) {
    return 'st'
  }
  return 'th';
};

/**
 * Viewport Width
 */
export const windowWidth = () => window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

/**
 * Viewport height
 */
export const windowHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

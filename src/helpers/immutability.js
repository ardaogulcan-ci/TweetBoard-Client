import { List } from 'immutable';

export function merger(a, b) {
  if (List.isList(a) && List.isList(b)) {
    return a.concat(b);
  }
  if (a && a.mergeWith) {
    return a.mergeWith(merger, b);
  }
  return b;
}

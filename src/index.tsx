import { TextEncoder } from '@polkadot/x-textencoder';
import * as React from 'react'

globalThis.TextEncoder = TextEncoder
globalThis.React = React
function setTimeout(fn) {
  fn()
}


interface RecursiveDivProps {
  deep: number;
  count: number;
}

const RecursiveDiv: React.FC<RecursiveDivProps> = ({ deep, count }) => {
  if (deep === 0) {
    return null;
  }
  const children = Array.from({ length: count }, (_, index) => (
    <RecursiveDiv key={index} deep={deep - 1} count={count} />
  ));
  return <div
    id={deep + '-' + count}
    key={deep + '-' + count}
    width={deep + '-' + count}
    height={deep + '-' + count}
  >{children}</div>;
};

globalThis.setTimeout = setTimeout
import('react-dom/server').then((v) => {
  const { renderToString } = v
  const st = +Date.now()
  const s = renderToString(
    <RecursiveDiv deep={4} count={5} />
  )
  const ed = +Date.now()
  // console.log("ssr text: ", s)
  console.log("ssr time: ", ed - st)
})
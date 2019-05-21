import * as React from 'react';

function Button(props: any) {
  return (
    <button {...props} type="button">{props.children}</button> 
  )
}

export default Button;

import * as React from 'react';

export const navigationRef: any = React.createRef();

export function navigate(name: any, params: any) {
  navigationRef.current?.navigate(name, params);
}

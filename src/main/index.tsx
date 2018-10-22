import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Hello } from './ts/component/hello/Hello';

ReactDOM.render(
    <Hello compiler='Liu Zhiliang' framework='My Blog' />,
    document.getElementById('app')
);

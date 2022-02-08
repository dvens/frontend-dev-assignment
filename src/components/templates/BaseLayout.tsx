import { FunctionComponent } from 'react';

export const BaseLayout: FunctionComponent = ({ children }) => (
    <main id="content">
        <div className="container">{children}</div>
    </main>
);

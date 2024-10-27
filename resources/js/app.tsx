import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ReactNode, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AuthenticatedLayout from './Layouts/authenticated-layout';
import { PageProps } from './types';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type LayoutType = (page: ReactNode) => ReactNode;
type GlobImports = Record<string, () => Promise<PageModule>>;

interface PageComponent extends React.FC<PageProps> {
    layout?: LayoutType;
}

interface PageModule {
    default: PageComponent;
}

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : `${appName}`),
    resolve: async (name: string) => {
        const page = await resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob('./Pages/**/*.tsx') as GlobImports,
        );

        page.default.layout = name.startsWith('Auth')
            ? undefined
            : (page) => <AuthenticatedLayout> {page} </AuthenticatedLayout>;

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

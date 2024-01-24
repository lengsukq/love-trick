// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react';
import {Provider} from 'react-redux';
import {useRouter} from 'next/navigation';
import { store } from '@/app/store/store'
export function Providers({children}) {
    const router = useRouter();
    return (
        <Provider store={store}>
            <NextUIProvider navigate={router.push}>
                {children}
            </NextUIProvider>
        </Provider>
    )
}

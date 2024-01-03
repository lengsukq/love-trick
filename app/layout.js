// app/layout.tsx
import {Providers} from "./providers";
import './globals.css'
export const metadata = {
    title: '登录 | love-trick',
    description: 'love-trick',
};
export default function RootLayout({children}) {
    return (
        <html lang="en" className='light'>
        <body>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}

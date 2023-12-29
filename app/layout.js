// app/layout.tsx
import {Providers} from "./providers";
import './globals.css'
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

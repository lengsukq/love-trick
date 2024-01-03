import React from "react";
import {TrickProviders} from "./trickProviders";
export const metadata  = {
    title: '首页 | love-trick',
    description: 'love-trick',
}
export default function RootLayout({children}) {
    return (
        <TrickProviders>
            {children}
        </TrickProviders>
    )
}

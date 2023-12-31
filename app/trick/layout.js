import React from "react";
import {TrickProviders} from "./trickProviders";

export default function RootLayout({children}) {
    return (
        <TrickProviders>
            {children}
        </TrickProviders>
    )
}

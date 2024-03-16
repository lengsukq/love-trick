'use client'
import React, {Suspense} from "react";
import {GlobalComponent} from "@/app/components/global/GlobalComponent";


export function TrickProviders({children}) {
    return (
        <Suspense>
                <div className={"pb-14"}>{children}</div>
                <GlobalComponent/>
        </Suspense>

    );
}

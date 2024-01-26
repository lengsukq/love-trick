'use client'
import React, {Suspense} from "react";
import {GlobalComponent} from "@/app/components/global/GlobalComponent";


export function TrickProviders({children}) {
    return (
        <Suspense>
            <div className="h-lvh">
                <div className={"pb-16"}>{children}</div>
                <GlobalComponent/>
            </div>
        </Suspense>

    );
}

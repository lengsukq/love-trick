'use client'
import React, {useEffect, useState} from "react";
import {Notify} from "react-vant";
import {WhisperForm} from "@/app/components/whisperForm";

export default function App() {

    useEffect(() => {

    }, [])
    return (
        <div className={"p-5"}>
        <WhisperForm/>
        </div>
    );
}

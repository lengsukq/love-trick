'use client'
import React, {useEffect, useState} from "react";
import {useRouter} from 'next/navigation'
import {Input, Button, Avatar} from "@nextui-org/react";
import {loginApi} from "@/app/utils/apihttp";
import {Notify} from "react-vant";

export default function Home() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const login = async () => {
        console.log('用户名:', username);
        console.log('密码:', password);
        loginApi({username:username,password:password}).then(res=>{
            console.log('res',res)
            Notify.show({ type: res.code ===200?'success':'warning', message: `${res.msg}` })
            if (res.code === 200) {
                router.push('/trick')
            }
        })

    };

    return (
        <div className="container flex flex-col justify-center items-center px-4 h-lvh">
            <Avatar isBordered radius="full" src="/defaultAvatar.jpg" className="w-40 h-40 text-large"/>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 m-10">
                <Input type="text" label="昵称" placeholder="请输入昵称" value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                <Input type="password" label="密码" placeholder="请输入密码" value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <Button color="primary" className="" onClick={login}>
                登录
            </Button>
        </div>
    )
}

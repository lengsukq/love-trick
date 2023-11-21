'use client'
import Image from 'next/image'
import React from "react";
import {Button,Flex } from "antd";
import { useState } from 'react';

export default function Home() {
    const [count, setCount] = useState(0);
    const addNum = ()=>{
        setCount(count+1)
    }

    const products = [
        { title: 'Cabbage', id: count,value:"ce" },
        { title: 'Garlic', id: 22222 ,value:"vv"},
        { title: 'Apple', id: 222222 ,value: "gg"},
    ];
    const listItems = products.map(product =>
        <li key={product.id}>
           id:{product.id} {product.value}+{product.title}
        </li>
    );
  return (
      <Flex gap="small" wrap="wrap">
          <h1>{count}</h1>
          <ul>{listItems}</ul>
          <Button type="primary" onClick={addNum}>+1</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="text">Text Button</Button>
          <Button type="link">Link Button</Button>
      </Flex>
  )
}

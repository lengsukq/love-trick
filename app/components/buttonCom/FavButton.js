import React from "react";
import {Button} from "@nextui-org/react";
import {HeartIcon} from "@/app/components/icon/HeartIcon";

export default function FavButton({buttonAct=()=>"",isFav,btnSize='md',iconSize=24,isLoading=false}) {


    return (
            <Button isIconOnly variant="faded" aria-label="Like" size={btnSize} onClick={()=>buttonAct()} isLoading={isLoading}>
                <HeartIcon isFav={isFav} size={iconSize}/>
            </Button>
    );
}

import { useState } from "react";

export default function ProductImages({images}){
    const [activeImage,setActiveImage] = useState(images?.[0]);
 return (
    <>
    <div className="items-center justify-center">
    <img className="max-w-40 max-h-40  " src={activeImage}/>
    </div>
    <div  className="flex gap-2 mt-2 flex-grow-0 cursor-pointer ">
        {images.map(image => (
            <div key={image} onClick={() => setActiveImage(image)} className="border-2 rounded-md w-10 h-10 p-1 ">
                <img src={image} alt=""/>
            </div>
        ))}
    </div>
    </>
 );   
}
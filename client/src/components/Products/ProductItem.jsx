import React from "react";
import { addProduct } from "../../redux/CardSlice";
import { useDispatch,useSelector } from "react-redux";
import { message } from "antd";

const ProductItem = ({item}) => {
  const dispatch=useDispatch();
  const card=useSelector((state)=>state.card);

  const handleClick=()=>{
    //console.log(item);
    dispatch(addProduct({...item,quantity:1}));
    message.success("Ürün Sepete Eklendi");
  }

  //console.log(card);
  
  return (
    <div className="product-item border cursor-pointer transition-all hover:shadow-lg select-none" onClick={handleClick}>
      <div className="product-img">
        <img
          src={item.img}
          alt="elma.jpg"
          className="h-28 object-cover border-b w-full"
        />
      </div>
      <div className="product-info flex flex-col p-3 ">
        <span className="font-bold">{item.title}</span>
        <span>{item.price}₺</span>
      </div>
    </div>
  );
};

export default ProductItem;

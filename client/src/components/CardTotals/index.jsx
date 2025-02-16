import React from "react";
import { Button, message } from "antd";
import {
  ClearOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteCard, increase, decrease, reset } from "../../redux/CardSlice";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch(); // methodlarımızı kullanabilek için
  const navigate=useNavigate();
  return (
    <div className="card h-full flex flex-col max-h-[calc(100vh-92px)]">
      <h2 className="bg-blue-600 text-center text-white py-4 font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>
      <ul className="card-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {card.cardItems.length > 0
          ? card.cardItems.map((item) => (
              <li className="card-item flex justify-between" key={item._id}>
                <div className="flex items-center">
                  <img
                    className="w-16 h-16 object-cover cursor-pointer"
                    src={item.img}
                    alt=""
                    onClick={() => {
                      dispatch(deleteCard(item));
                      message.success("Ürün Sepetten Silindi");
                    }}
                  />
                  <div className="flex flex-col ml-2">
                    <b>{item.title}</b>
                    <span>
                      {item.price}₺ x {item.quantity}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button
                    icon={<PlusCircleOutlined />}
                    size="small"
                    type="primary"
                    className="rounded-full"
                    onClick={() => dispatch(increase(item))}
                  ></Button>
                  <span className="font-bold w-6 text-center">
                    {item.quantity}
                  </span>
                  <Button
                    icon={<MinusCircleOutlined />}
                    size="small"
                    type="primary"
                    className="rounded-full"
                    onClick={() => {
                      if (item.quantity === 1) {
                        if (window.confirm("Ürün Silinsin Mi?")) {
                          dispatch(decrease(item));
                          message.success("Ürün Sepetten Silindi");
                        }
                      }
                      if (item.quantity > 1) {
                        dispatch(decrease(item));
                      }
                    }}
                  ></Button>
                </div>
              </li>
            )).reverse()
          : "Sepette Hiç Ürün Yok..."}
      </ul>
      <div className="card-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara toplam</b>
            <span>{card.total > 0 ? card.total.toFixed(2) : 0}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{card.tax}</b>
            <span className="text-red-700">
              {(card.total * card.tax) / 100 > 0
                ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-green-500 text-lg">Genel toplam</b>
            <span className="text-2xl ">
              {card.total > 0
                ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            size="large"
            type="primary"
            className="w-full"
            disabled={card.cardItems.length === 0}
            onClick={()=>navigate("/card")}
          >
            Sipariş Oluştur
          </Button>
          <Button
            icon={<ClearOutlined />}
            danger
            size="large"
            type="primary"
            className="w-full mt-2 mb-12"
            disabled={card.cardItems.length === 0}
            onClick={() => {
              if (window.confirm("Emin Misiniz?")) {
                dispatch(reset());
                message.success("Sepet Başarıyla Temizlendi");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;

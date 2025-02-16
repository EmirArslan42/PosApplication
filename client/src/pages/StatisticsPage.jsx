import { useState, useEffect } from "react";
import Header from "./../components/Header/index";
import StatisticCard from "./../components/StatisticCard/index";
import { Area, Pie } from "@ant-design/plots";
import { Spin } from "antd";

const StatisticsPage = () => {
  const [data, setData] = useState();
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));
  //console.log(user);
  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  // console.log(data);
  const config = {
    data,
    xField: "customerName",
    yField: "subtotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    data: data,
    angleField: "totalAmount",
    colorField: "customerName",
    paddingRight: 50,
    innerRadius: 0.6,
    label: {
      text: "totalAmount",
      style: {
        fontWeight: "bold",
      },
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
    annotations: [
      {
        type: "text",
        style: {
          text: "Toplam\nDeğer",
          x: "50%",
          y: "50%",
          textAlign: "center",
          fontSize: 28,
          fontStyle: "bold",
        },
      },
    ],
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)} ₺`;
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/products/get-all");
        const data = await res.json();
        //console.log(data);
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  // px-6 md:pb-20 pb-0 => px-6 md:pb-0 pb-20 olarak değiştirildi

  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
      {data ? (
        <div className="px-6 md:pb-0 pb-20">
          <div>
            <h2 className="text-xl">
              Hoş geldin{" "}
              <span className="text-green-700 text-xl font-bold">
                {user.username[0].toUpperCase() + user.username.slice(1)}
              </span>
              .
            </h2>
            <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 my-10 md:gap-10 gap-4">
              <StatisticCard
                title="Toplam Müşteri"
                amount={data?.length}
                img="images/user.png"
              />
              <StatisticCard
                title="Toplam Kazanç"
                amount={totalAmount()}
                img="images/money.png"
              />
              <StatisticCard
                title="Toplam Satış"
                amount={data?.length}
                img="images/sale.png"
              />
              <StatisticCard
                title="Toplam Ürün"
                amount={products?.length}
                img="images/product.png"
              />
            </div>
            <div className="flex justify-between gap-10 lg:flex-row flex-col items-center">
              <div className="lg:w-1/2 w-4/5 lg:h-80 h-72 ">
                <Area {...config} />
              </div>
              <div className="flex justify-between items-center">
                <Pie {...config2} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spin
          size="large"
          className="absolute top-1/3 left-1/2"
        ></Spin>
      )}
    </>
  );
};

export default StatisticsPage;

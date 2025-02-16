import React, { useEffect, useState } from "react";
import Header from "./../components/Header/index";
import Categories from "./../components/Categories/Index";
import Products from "./../components/Products/index";
import CardTotals from "./../components/CardTotals/index";
import { Spin } from "antd";

const HomePage = () => {
  const [categories, setCategories] = useState();
  const [filtered, setFiltered] = useState([]);
  const [products, setProducts] = useState();
  const [search, setSearch] = useState([]);

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

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/get-all");
        const data = await res.json();
        //console.log(data);
        data &&
          setCategories(
            data.map((item) => {
              return { ...item, value: item.title };
            })
          );
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  //console.log(search);
  // pb-24 => mb-56 olarak değiştirildi
  return (
    <>
      <Header setSearch={setSearch} />
      {categories && products ? (
        <div className="home flex md:flex-row flex-col justify-between px-6 gap-10 md:pb-0 !mb-80 h-screen">
          <div className="categories overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 min-h-[135px]">
            <Categories
              categories={categories}
              setCategories={setCategories}
              setFiltered={setFiltered}
              products={products}
            />
          </div>
          <div className="products flex-[8] overflow-auto max-h-[calc(100vh_-_112px)] md:pb-10 min-h-[500px]">
            <Products
              categories={categories}
              filtered={filtered}
              products={products}
              setProducts={setProducts}
              search={search}
            />
          </div>
          <div className="card-wrapper min-w-[300px] md:-mr-[24px] md:-mt-[24px] border-l">
            <CardTotals />
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

export default HomePage;

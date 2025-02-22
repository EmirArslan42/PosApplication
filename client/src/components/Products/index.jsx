import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Index = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="products-wrapper grid grid-cols-card gap-4">
      {filtered
        .filter((product) => product.title.toLowerCase().includes(search))
        .map((item) => (
          <ProductItem key={item._id} item={item} />
        ))}
      <div
        className="product-item border cursor-pointer transition-all hover:shadow-lg select-none bg-purple-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
        onClick={() => setIsAddModalOpen(true)}
      >
        <PlusOutlined className="text-white md:text-2xl" />
      </div>
      <div
        onClick={() => navigate("/products")}
        className="product-item border cursor-pointer transition-all hover:shadow-lg select-none bg-orange-800 flex justify-center items-center hover:opacity-90 min-h-[180px]"
      >
        <EditOutlined className="text-white md:text-2xl" />
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Index;

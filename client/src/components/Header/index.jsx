import React from "react";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Badge, Input, message } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const Index = ({ setSearch }) => {
  const card = useSelector((state) => state.card);

  const totalItems = card.cardItems.reduce((total, item) => total + item.quantity, 0);

  
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(card.cardItems.length);
  //console.log(pathname);

  const logOut = () => {
    if (window.confirm("Çıkış Yapmak İstediğinize Emin Misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış İşlemi Başarılı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex justify-between items-center gap-10">
        <div className="logo">
          <a href="/">
            <h2 className="text-2xl font-bold md:text-4xl">LOGO</h2>
          </a>
        </div>
        <div
          className="header-search flex-1 flex justify-center"
          onClick={() => {
            pathname !== "/" && navigate("/");
          }}
        >
          <Input
            className="rounded-full max-w-[800px]"
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="menu-links">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "active"}`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-[12px] text-[10px]">Anasayfa</span>
          </Link>

          <Badge count={totalItems} className="md:flex hidden">
            <Link
              to={"/card"}
              className={`menu-link ${pathname === "/card" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-[12px] text-[10px]">Sepet</span>
            </Link>
          </Badge>

          <Link
            to={"/bills"}
            className={`menu-link ${pathname === "/bills" && "active"}`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-[12px] text-[10px]">Faturalar</span>
          </Link>

          <Link
            to={"/customers"}
            className={`menu-link ${pathname === "/customers" && "active"}`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-[12px] text-[10px]">Müşteriler</span>
          </Link>

          <Link
            to={"/statistics"}
            className={`menu-link ${pathname === "/statistics" && "active"}`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-[12px] text-[10px]">İstatistikler</span>
          </Link>

          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-[12px] text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>

        <Badge count={totalItems} className="md:hidden flex">
          <Link
            to="/card"
            href="menu-link"
            className={`menu-link ${pathname === "/card" && "active"}`}
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-[12px] text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Index;

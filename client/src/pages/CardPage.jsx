import React, { useRef, useState } from "react";
import Header from "./../components/Header/index";
import { Table, Card, Button, message, Popconfirm, Space, Input } from "antd";
import CreateBill from "./../components/CreateBill/index";
import { useDispatch, useSelector } from "react-redux";
import { MinusCircleOutlined, PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { decrease, deleteCard, increase } from "../redux/CardSlice";
import Highlighter from 'react-highlight-words';

const CardPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const card = useSelector((state) => state.card);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });


  const columns = [
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      key: "img",
      width: "125px",
      render: (text) => {
        return <img className="w-full h-20 object-cover" src={text} alt="" />;
      },
    },
    {
      title: "Ürün Adı",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps('title'),
    },
    {
      title: "Kategori",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps('category'),
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text.toFixed(2)}₺</span>;
      },
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Ürün Adedi",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => {
        return (
          <div className="flex items-center">
            <Button
              icon={<PlusCircleOutlined />}
              size="small"
              type="primary"
              className="rounded-full"
              onClick={() => dispatch(increase(record))}
            ></Button>
            <span className="font-bold w-6 text-center">{record.quantity}</span>
            <Button
              icon={<MinusCircleOutlined />}
              size="small"
              type="primary"
              className="rounded-full"
              onClick={() => {
                if (record.quantity === 1) {
                  if (window.confirm("Ürün Silinsin Mi?")) {
                    dispatch(decrease(record));
                    message.success("Ürün Sepetten Silindi");
                  }
                }
                if (record.quantity > 1) {
                  dispatch(decrease(record));
                }
              }}
            ></Button>
          </div>
        );
      },
    },
    {
      title: "Toplam Fiyat",
      dataIndex: "total",
      key: "total",
      render: (text, record) => {
        return <span>{(record.quantity * record.price).toFixed(2)}₺</span>;
      },
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <Popconfirm
          title="Silmek İstediğinize Emin Misiniz?"
          onConfirm={() => {
            dispatch(deleteCard(record));
            message.success("Ürün Sepetten Silindi");
          }}
          okText="Evet"
          cancelText="Hayır"
          >
            <Button
            type="link"
            danger
          >
            Sil
          </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <Header />
      <div className="px-6">
        <Table
          dataSource={card.cardItems}
          columns={columns}
          bordered
          pagination={false}
          scroll={{
            x:1200,
            y:300
          }}
        />
        <div className="card-total flex justify-end mt-4">
          <Card className="w-72">
            <div className="flex justify-between ">
              <span>Ara Toplam</span>
              <span>{card.total > 0 ? card.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{card.tax}</span>
              <span className="text-red-600">{(card.total * card.tax) / 100 > 0
                ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                : 0}
              ₺</span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>{card.total > 0
                ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                : 0}₺</b>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full"
              type="primary"
              size="large"
              disabled={card.cardItems.length === 0}
            >
              Sipariş Oluştur
            </Button>
          </Card>
        </div>
      </div>
      <CreateBill isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default CardPage;

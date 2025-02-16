import { Button, Form, Input, message, Modal, Select, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useEffect, useState } from "react";

const Edit = ({}) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isEditModalOpan, setIsEditModalOpan] = useState(false);
  const [editingItem, setEditingItem] = useState({});
  const [form] = Form.useForm();

  //console.log(editingItem);
  

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
          data && setCategories(data.map((item)=>{
            return {...item,value:item.title}
          }));
        } catch (error) {
          console.log(error);
        }
      };
      getCategories();
    }, []);

  const onFinish = (values) => {
    //console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/products/update-product", {
        method: "PUT",
        body: JSON.stringify({ ...values,productId:editingItem._id }),
        headers: { "Content-type": "application/json ; charset=UTF-8" },
      });
      setProducts(
        products.map((item) => {
          if(item._id===editingItem._id){ // anlık güncelleme yapmamızı sağlar
            return values;
          }else{
            return item;
          }
        })
      );
      message.success("Ürün Başarıyla Güncellendi");
    } catch (error) {
      message.error("Bir Şeyler Ters Gitti!!");
      console.log(error);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Emin Misiniz?")) {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL+"/api/products/delete-product",
          {
            method: "DELETE",
            body: JSON.stringify({ productId: id }),
            headers: { "Content-type": "application/json ; charset=UTF-8" },
          }
        );
        message.success("Ürün Başarıyla Silindi");
        setProducts(products.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir Şeyler Ters Gitti");
        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "title",
      width: "8%",
      render: (text, record) => {
        return <p>{record.title}</p>;
      },
    },
    {
      title: "Ürün Görseli",
      dataIndex: "img",
      width: "4%",
      render: (text, record) => {
        return (
          <img src={record.img} alt="" className="w-full h-20 object-cover" />
        );
      },
    },
    {
      title: "Ürün Fiyatı",
      dataIndex: "price",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "category",
      width: "8%",
    },
    {
      title: "Action",
      dataIndex: "action",
      width: "8%",
      render: (text, record) => {
        return (
          <div>
            <Button
              className="pl-0"
              type="link"
              onClick={() => {
                setIsEditModalOpan(true);
                setEditingItem(record);
                form.setFieldsValue(record); // form içeriğini güncelle
              }}
            >
              Düzenle
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteProduct(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <Table
        bordered
        dataSource={products}
        columns={columns}
        rowKey={"_id"}
        scroll={{
          x: 1000,
          y: 600,
        }}
      />
      <Modal
        title="Ürün Güncelle"
        open={isEditModalOpan}
        onCancel={() => setIsEditModalOpan(false)}
        footer={false}
      >
        <Form layout="vertical" onFinish={onFinish} form={form} initialValues={editingItem}>
          <FormItem
            label="Ürün Adı"
            name="title"
            rules={[
              { required: true, message: "Ürün Adı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün Adı Giriniz"></Input>
          </FormItem>
          <FormItem
            label="Ürün Görseli"
            name="img"
            rules={[
              { required: true, message: "Ürün Görseli Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün Görseli Giriniz"></Input>
          </FormItem>
          <FormItem
            label="Ürün Fiyatı"
            name="price"
            rules={[
              { required: true, message: "Ürün Fiyatı Alanı Boş Geçilemez!" },
            ]}
          >
            <Input placeholder="Ürün Fiyatı Giriniz"></Input>
          </FormItem>

          <FormItem
            label="Kategori Seç"
            name="category"
            rules={[
              { required: true, message: "Ürün Kategori Alanı Boş Geçilemez!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Search to Select"
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.title ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.title ?? "").toLowerCase())
              }
              options={categories}
            />
          </FormItem>

          <FormItem className="flex justify-end mb-0">
            <Button type="primary" htmlType="submit">
              Kaydet
            </Button>
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Edit;

import { Button, Form, Input, message, Modal, Select } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";

const Add = ({
  isAddModalOpen,
  setIsAddModalOpen,
  categories,
  setProducts,
  products,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    //console.log(values);
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/products/add-product", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      message.success("Ürün Başarıyla Eklendi");
      setIsAddModalOpen(false)
      form.resetFields();
      setProducts([
        ...products,
        {
          ...values,
          _id: Math.random(),
          price: Number(values.price),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal
      title="Yeni Ürün Ekle"
      open={isAddModalOpen}
      onCancel={()=>setIsAddModalOpen(false)}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <FormItem
          label="Ürün Adı"
          name="title"
          rules={[{ required: true, message: "Ürün Adı Alanı Boş Geçilemez!" }]}
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
            Oluştur
          </Button>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Add;

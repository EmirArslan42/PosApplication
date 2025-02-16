import { Button, Form, Input, message, Modal, Table } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";

const Edit = ({
  isEditModalOpen,
  setIsEditModalOpen,
  categories,
  setCategories,
}) => {
  const [editingRow, setEditingRow] = useState({});
  //console.log(editingRow);
  const onFinish = (values) => {
    try {
      fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/update-category", {
        method: "PUT",
        body: JSON.stringify({ ...values, categoryId: editingRow._id }),
        headers: { "Content-type": "application/json ; charset=UTF-8" },
      });
      setCategories(
        categories.map((item) => {
          if (item._id === editingRow._id) {
            return { ...item, title: values.title };
          } else return item;
        })
      );
      message.success("Kategori Başarıyla Güncellendi");
    } catch (error) {
      message.error("Bir Şeyler Ters Gitti!!");
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    if (window.confirm("Emin Misiniz?")) {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL+"/api/categories/delete-category",
          {
            method: "DELETE",
            body: JSON.stringify({ categoryId: id }),
            headers: { "Content-type": "application/json ; charset=UTF-8" },
          }
        );
        message.success("Kategori Başarıyla Silindi");
        setCategories(categories.filter((item) => item._id !== id));
      } catch (error) {
        message.error("Bir Şeyler Ters Gitti");
        console.log(error);
      }
    }
  };
  const columns = [
    {
      title: "Category Title",
      dataIndex: "title",
      render: (text, record) => {
        if (record._id === editingRow._id) {
          return (
            <FormItem className="mb-0" name="title">
              <Input placeholder={record.title} value={record.title} />
            </FormItem>
          );
        } else {
          return <p>{record.title}</p>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div>
            <Button
              className="pl-0"
              type="link"
              onClick={() => setEditingRow(record)}
            >
              Düzenle
            </Button>
            <Button type="link" htmlType="submit" className="text-gray-500">
              Kaydet
            </Button>
            <Button
              type="link"
              danger
              onClick={() => deleteCategory(record._id)}
            >
              Sil
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <Modal
      title="Kategori İşlemleri"
      open={isEditModalOpen}
      onCancel={() => setIsEditModalOpen(false)}
      footer={false}
    >
      <Form onFinish={onFinish}>
        <Table
          bordered
          dataSource={categories}
          columns={columns}
          rowKey={"_id"}
        />
      </Form>
    </Modal>
  );
};

export default Edit;

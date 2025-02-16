import { Button, Form, Input, message, Modal } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React from 'react'

const Add = ({isAddModalOpen,handleCancel,categories,setCategories }) => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
      //console.log(values);
      try {
        fetch(process.env.REACT_APP_SERVER_URL+"/api/categories/add-category", {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json;charset=UTF-8" },
        });
        message.success("Kategori Başarıyla Eklendi");
        form.resetFields();
        setCategories([...categories,{
            _id:Math.random(),
            title:values.title
        }])
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Modal
    title="Yeni Kategori Ekle"
    open={isAddModalOpen}
    onCancel={handleCancel}
    footer={false}
  >
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <FormItem
        label="Kategori Ekle"
        name="title"
        rules={[
          { required: true, message: "Kategori Alanı Boş Geçilemez!" },
        ]}
      >
        <Input></Input>
      </FormItem>
      <FormItem className="flex justify-end mb-0">
        <Button type="primary" htmlType="submit">
          Oluştur
        </Button>
      </FormItem>
    </Form>
  </Modal>
  )
}

export default Add
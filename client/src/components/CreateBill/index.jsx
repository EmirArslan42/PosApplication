//import '@ant-design/v5-patch-for-react-19';
import { Button, Card, Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { reset } from "../../redux/CardSlice";
import { useNavigate } from "react-router-dom";

const Index = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const onFinish =async (values) => {
    //console.log("Formdan alınan değerler", values);
    try {
      const res=await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/add-bill",{
        method:"POST",
        body:JSON.stringify({
          ...values,
          subtotal:card.total,
          tax:((card.total * card.tax) / 100).toFixed(2),
          totalAmount:(card.total + (card.total * card.tax) / 100).toFixed(2),
          cardItems:card.cardItems,
        }),
        headers:{"Content-type":"application/json;charset=UTF-8"}
      })
      if(res.status===200){
        message.success("Fatura Başarıyla Oluşturuldu");
        dispatch(reset())
        navigate("/bills")
      }
    } catch (error) {
      message.error("Bir Şeyler Ters Gitti..");
      console.log(error);
      
    }
  };
  const card = useSelector((state) => state.card);

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      footer={false}
      onCancel={() => setIsModalOpen(false)}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name={"customerName"}
          label="Müşteri Adı"
          rules={[{ required: true, message: "Müşteri Adı Boş Geçilemez" }]}
        >
          <Input placeholder="Bir Müşteri Adı Yazınız"></Input>
        </Form.Item>
        <Form.Item
          name={"customerPhoneNumber"}
          label="Telefon Numarası"
          rules={[
            { required: true, message: "Telefon Numarası Boş Geçilemez" },
          ]}
        >
          <Input
            maxLength={11}
            placeholder="Bir Telefon Numarası Yazınız"
          ></Input>
        </Form.Item>
        <Form.Item
          name={"paymentMode"}
          label="Ödeme Yöntemi"
          rules={[{ required: true, message: "Ödeme Yöntemi Boş Geçilemez" }]}
        >
          <Select placeholder="Bir Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
          </Select>
        </Form.Item>
        <div className="card-total flex justify-end mt-4">
          <Card className="w-full">
            <div className="flex justify-between ">
              <span>Ara Toplam</span>
              <span>{card.total > 0 ? card.total.toFixed(2) : 0}₺</span>
            </div>
            <div className="flex justify-between my-2">
              <span>KDV %{card.tax}</span>
              <span className="text-red-600">
                {(card.total * card.tax) / 100 > 0
                  ? `+${((card.total * card.tax) / 100).toFixed(2)}`
                  : 0}
                ₺
              </span>
            </div>
            <div className="flex justify-between">
              <b>Genel Toplam</b>
              <b>
                {card.total > 0
                  ? (card.total + (card.total * card.tax) / 100).toFixed(2)
                  : 0}
                ₺
              </b>
            </div>
            <div className="flex justify-end">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="mt-4"
                type="primary"
                size="middle"
                htmlType="submit"
                disabled={card.cardItems.length === 0}
              >
                Fatura Oluştur
              </Button>
            </div>
          </Card>
        </div>
      </Form>
    </Modal>
  );
};

export default Index;

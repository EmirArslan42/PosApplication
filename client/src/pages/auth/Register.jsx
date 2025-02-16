import { Button, Carousel, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    //console.log(values);
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/register", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      //console.log(res);
      if (res.status === 200) {
        message.success("Kayıt İşlemi Başarılı");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.success("Bir Şeyler Yanlış Gitti");
    }
  };
  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="relative xl:px-20 px-10 flex flex-col h-full justify-center w-full">
          <h1 className="text-center text-5xl font-bold">LOGO</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <FormItem
              label="Kullanıcı Adı"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Kullanıcı Adı Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Email Alanı Boş Bırakılamaz",
                },
              ]}
            >
              <Input></Input>
            </FormItem>
            <FormItem
              label="Şifre"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password></Input.Password>
            </FormItem>
            <FormItem
              label="Şifre Tekrar"
              name="passwordAgain"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre Tekrar Alanı Boş Bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  },
                }),
              ]}
            >
              <Input.Password></Input.Password>
            </FormItem>
            <FormItem>
              <Button
                className="w-full"
                htmlType="submit"
                size="large"
                type="primary"
                loading={loading}
              >
                Kaydol
              </Button>
            </FormItem>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?{" "}
            <Link className="text-blue-600 ml-1" to="/login">
              Şimdi giriş yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel autoplay className="!h-full px-6">
                <AuthCarousel
                  img="images/responsive.svg"
                  title="Responsive"
                  description="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img="images/statistic.svg"
                  title="İstatistikler"
                  description="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img="images/customer.svg"
                  title="Müşteri Memnuniyeti"
                  description="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img="images/admin.svg"
                  title="Yönetici Paneli"
                  description="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

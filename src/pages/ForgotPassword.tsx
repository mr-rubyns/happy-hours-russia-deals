
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Инструкции отправлены",
        description: "Проверьте вашу электронную почту для восстановления пароля.",
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600">Happy Hours</h1>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Восстановление пароля</h2>
          <p className="text-gray-600 mb-6">
            Введите ваш email, и мы отправим вам инструкции по восстановлению пароля
          </p>
          
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Проверьте вашу почту</h3>
              <p className="text-gray-600 mb-4">
                Мы отправили инструкции по восстановлению пароля на {email}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Не получили письмо? Проверьте папку спам или{" "}
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-orange-600 hover:text-orange-700"
                >
                  попробуйте снова
                </button>
              </p>
              <Link to="/login">
                <Button className="w-full">Вернуться на страницу входа</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                disabled={loading}
              >
                {loading ? "Отправка..." : "Отправить инструкции"}
              </Button>
            </form>
          )}
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Вспомнили пароль?{" "}
            <Link to="/login" className="text-orange-600 hover:text-orange-700 font-medium">
              Войти
            </Link>
          </p>
        </div>
        
        <div className="text-center mt-4">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm">
            Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

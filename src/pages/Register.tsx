
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate form
    if (!email || !firstName || !password || !confirmPassword) {
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Ошибка регистрации",
        description: "Пароли не совпадают.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, примите условия использования и политику конфиденциальности.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    // Simulate registration process
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в Happy Hours!",
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-orange-600">Happy Hours</h1>
          </Link>
          <p className="mt-2 text-gray-600">
            Создайте учетную запись, чтобы получить доступ к эксклюзивным акциям
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Регистрация</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            
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
            
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm">
                Я принимаю{" "}
                <Link to="/terms" className="text-orange-600 hover:text-orange-700">
                  условия использования
                </Link>{" "}
                и{" "}
                <Link to="/privacy" className="text-orange-600 hover:text-orange-700">
                  политику конфиденциальности
                </Link>
              </Label>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
              disabled={loading}
            >
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Или зарегистрироваться через
                </span>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Вконтакте
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Уже есть учетная запись?{" "}
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

export default Register;

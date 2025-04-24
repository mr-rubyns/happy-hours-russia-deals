
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="text-orange-500 font-bold text-9xl">404</div>
          <h1 className="mt-4 text-3xl font-bold">Страница не найдена</h1>
          <p className="mt-2 text-lg text-gray-600">
            Упс! Страница, которую вы ищете, не существует или была удалена.
          </p>
          <div className="mt-8">
            <Link to="/">
              <Button className="px-8">Вернуться на главную</Button>
            </Link>
          </div>
          <p className="mt-6 text-gray-500">
            Если вы считаете, что произошла ошибка, пожалуйста,{" "}
            <Link to="/contacts" className="text-orange-600 hover:text-orange-700">
              свяжитесь с нами
            </Link>
            .
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;

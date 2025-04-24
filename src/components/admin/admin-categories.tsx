
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { mainCategories, categories } from "@/data/mockData";
import { Plus, MoreHorizontal, Pencil, Trash } from "lucide-react";

const AdminCategories = () => {
  const [isMainCategoryModalOpen, setIsMainCategoryModalOpen] = useState(false);
  const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
  const [newMainCategory, setNewMainCategory] = useState({ id: "", name: "", icon: "" });
  const [newSubCategory, setNewSubCategory] = useState({ id: "", name: "", icon: "", mainCategoryId: "" });
  const [mainCategoryList, setMainCategoryList] = useState(mainCategories);
  const [subCategoryList, setSubCategoryList] = useState(categories);

  const handleMainCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = [...mainCategoryList, { ...newMainCategory, id: `main-${Date.now()}` }];
    setMainCategoryList(updatedList);
    setNewMainCategory({ id: "", name: "", icon: "" });
    setIsMainCategoryModalOpen(false);
  };

  const handleSubCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = [...subCategoryList, { ...newSubCategory, id: `sub-${Date.now()}` }];
    setSubCategoryList(updatedList);
    setNewSubCategory({ id: "", name: "", icon: "", mainCategoryId: "" });
    setIsSubCategoryModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Основные категории</CardTitle>
            <Dialog open={isMainCategoryModalOpen} onOpenChange={setIsMainCategoryModalOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Добавить категорию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить основную категорию</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleMainCategorySubmit} className="space-y-4 pt-4">
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium mb-1">
                      Название категории
                    </label>
                    <Input
                      id="categoryName"
                      value={newMainCategory.name}
                      onChange={(e) => setNewMainCategory({...newMainCategory, name: e.target.value})}
                      placeholder="Например: Рестораны"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="categoryIcon" className="block text-sm font-medium mb-1">
                      Иконка (emoji или название)
                    </label>
                    <Input
                      id="categoryIcon"
                      value={newMainCategory.icon}
                      onChange={(e) => setNewMainCategory({...newMainCategory, icon: e.target.value})}
                      placeholder="Например: 🍽️ или Utensils"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Сохранить</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Иконка</TableHead>
                <TableHead>Название</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainCategoryList.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.id}</TableCell>
                  <TableCell>
                    <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-md">
                      {category.icon === "Gift" ? "🎁" : 
                      category.icon === "Home" ? "🏠" : 
                      category.icon === "Utensils" ? "🍽️" : "📌"}
                    </div>
                  </TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Открыть меню</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex items-center gap-2">
                          <Pencil className="h-4 w-4" /> Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                          <Trash className="h-4 w-4" /> Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Подкатегории</CardTitle>
            <Dialog open={isSubCategoryModalOpen} onOpenChange={setIsSubCategoryModalOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" /> Добавить подкатегорию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить подкатегорию</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubCategorySubmit} className="space-y-4 pt-4">
                  <div>
                    <label htmlFor="mainCategoryId" className="block text-sm font-medium mb-1">
                      Основная категория
                    </label>
                    <select
                      id="mainCategoryId"
                      value={newSubCategory.mainCategoryId}
                      onChange={(e) => setNewSubCategory({...newSubCategory, mainCategoryId: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                      required
                    >
                      <option value="">Выберите категорию</option>
                      {mainCategoryList.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subCategoryName" className="block text-sm font-medium mb-1">
                      Название подкатегории
                    </label>
                    <Input
                      id="subCategoryName"
                      value={newSubCategory.name}
                      onChange={(e) => setNewSubCategory({...newSubCategory, name: e.target.value})}
                      placeholder="Например: Итальянская кухня"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subCategoryIcon" className="block text-sm font-medium mb-1">
                      Иконка (emoji или название)
                    </label>
                    <Input
                      id="subCategoryIcon"
                      value={newSubCategory.icon}
                      onChange={(e) => setNewSubCategory({...newSubCategory, icon: e.target.value})}
                      placeholder="Например: 🍝 или Pizza"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Сохранить</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Иконка</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Основная категория</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subCategoryList.map((subcategory) => {
                const parentCategory = mainCategoryList.find(c => c.id === subcategory.mainCategoryId);
                return (
                  <TableRow key={subcategory.id}>
                    <TableCell>{subcategory.id}</TableCell>
                    <TableCell>
                      <div className="h-8 w-8 flex items-center justify-center bg-gray-100 rounded-md">
                        {subcategory.icon === "Wine" ? "🍷" : 
                        subcategory.icon === "Utensils" ? "🍽️" : 
                        subcategory.icon === "Heart" ? "❤️" : "📌"}
                      </div>
                    </TableCell>
                    <TableCell>{subcategory.name}</TableCell>
                    <TableCell>{parentCategory?.name || "—"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Открыть меню</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="flex items-center gap-2">
                            <Pencil className="h-4 w-4" /> Редактировать
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                            <Trash className="h-4 w-4" /> Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCategories;

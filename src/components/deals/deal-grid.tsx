
import { DealCard } from "@/components/deals/deal-card";
import { Deal } from "@/types";

interface DealGridProps {
  deals: Deal[];
  emptyMessage?: string;
}

export function DealGrid({ deals, emptyMessage = "Акций не найдено" }: DealGridProps) {
  if (deals.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {deals.map((deal) => (
        <DealCard key={deal.id} deal={deal} />
      ))}
    </div>
  );
}

import { Package, AlertTriangle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useLowStock } from "@/hooks/use-dashboard";

interface InventoryItem {
  id: number;
  name: string;
  sku: string;
  quantity_in_stock: number;
  reorder_level: number;
  status: "critical" | "low" | "warning";
}

const statusStyles = {
  critical: "bg-destructive/10 text-destructive border-destructive/20",
  low: "bg-warning/10 text-warning border-warning/20",
  warning: "bg-primary/10 text-primary border-primary/20",
};

export function InventoryAlert() {
  const { data: rawItems, isLoading, error } = useLowStock();

  const lowStockItems: InventoryItem[] = (rawItems as any[]) || [];

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-6 w-40 bg-secondary rounded mb-6" />
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "500ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-destructive/10">
            <Package className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Low Stock Alert</h2>
            <p className="text-sm text-muted-foreground">Items needing reorder</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
          {lowStockItems.length} Items
        </Badge>
      </div>

      <div className="space-y-3">
        {lowStockItems.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-border rounded-xl">
            <p className="text-muted-foreground">All items fully stocked</p>
          </div>
        ) : (
          lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                <AlertTriangle
                  className={cn(
                    "w-5 h-5",
                    item.status === "critical"
                      ? "text-destructive"
                      : item.status === "low"
                        ? "text-warning"
                        : "text-primary"
                  )}
                />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.sku}</p>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{item.quantity_in_stock}</span>
                  <span className="text-xs text-muted-foreground">/ {item.reorder_level}</span>
                </div>
                <Badge className={cn("text-xs mt-1", statusStyles[item.status])}>
                  {item.status}
                </Badge>
              </div>
            </div>
          ))
        )}
      </div>

      <Button className="w-full mt-4 gradient-primary text-primary-foreground">
        <ShoppingCart className="w-4 h-4 mr-2" />
        Create Reorder
      </Button>
    </div>
  );
}

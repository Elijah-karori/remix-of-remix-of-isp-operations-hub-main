import { Wallet, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFinanceSnapshot } from "@/hooks/use-dashboard";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function FinanceOverview() {
  const { data: snapshot, isLoading, error } = useFinanceSnapshot();

  if (isLoading) {
    return (
      <div className="glass rounded-xl p-6 animate-pulse">
        <div className="h-6 w-40 bg-secondary rounded mb-6" />
        <div className="h-48 w-full bg-secondary rounded mb-6" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 w-full bg-secondary rounded" />
          ))}
        </div>
      </div>
    );
  }

  // Use real transactions if available, otherwise empty
  const transactions = snapshot?.recent_transactions || [];

  // Mock trend data for chart as it's not fully provided by snapshot API yet
  const revenueData = [
    { month: "Jan", revenue: snapshot?.monthly_revenue || 0, expenses: snapshot?.monthly_expenses || 0 },
  ];

  return (
    <div className="glass rounded-xl p-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-success/10">
            <Wallet className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Finance Overview</h2>
            <p className="text-sm text-muted-foreground">Revenue & Expenses</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          View Reports
        </Button>
      </div>

      {/* Chart */}
      <div className="h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(173, 80%, 40%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(0, 84%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(217, 33%, 20%)" />
            <XAxis dataKey="month" stroke="hsl(215, 20%, 65%)" fontSize={12} />
            <YAxis stroke="hsl(215, 20%, 65%)" fontSize={12} tickFormatter={(v) => `${v / 1000}K`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 13%)",
                border: "1px solid hsl(217, 33%, 20%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => [`KES ${value.toLocaleString()}`, ""]}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(173, 80%, 40%)"
              fill="url(#revenueGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="hsl(0, 84%, 60%)"
              fill="url(#expenseGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <p className="text-xs text-center text-muted-foreground py-4">No recent transactions</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === "income" ? "bg-success/20" : "bg-destructive/20"
                  }`}
              >
                {tx.type === "income" ? (
                  <ArrowUpRight className="w-5 h-5 text-success" />
                ) : (
                  <ArrowDownRight className="w-5 h-5 text-destructive" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
              </div>
              <span
                className={`text-sm font-semibold ${tx.type === "income" ? "text-success" : "text-destructive"
                  }`}
              >
                {tx.type === "income" ? "+" : "-"}KES {Math.abs(tx.amount).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { CURRENCIES, COMMON_CODES, FLAG_BY_CURRENCY, getCurrencyByCode, type Currency } from "@/lib/currency";
import { useCurrency } from "@/context/CurrencyContext";


export function CurrencyPicker({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const display = getCurrencyByCode(value);
  const flagCc = (FLAG_BY_CURRENCY[display.code] || display.code.slice(0, 2)).toLowerCase();
  const flagSrc = `https://flagcdn.com/24x18/${flagCc}.png`;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CURRENCIES;
    return CURRENCIES.filter(
      (c) => c.code.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [query]);

  const common = filtered.filter((c) => (COMMON_CODES as readonly string[]).includes(c.code));
  const others = filtered.filter((c) => !(COMMON_CODES as readonly string[]).includes(c.code));

  useEffect(() => {
    // Close on selection stored outside
  }, [value]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "flex h-10 items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 text-sm text-white cursor-pointer hover:bg-white/15",
            className
          )}
          aria-label="Choose currency"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <img src={flagSrc} alt={display.code} width={18} height={14} className="rounded-sm" />
          <span className="font-medium">{display.code} {display.symbol}</span>
          <ChevronDown className={cn("h-4 w-4 opacity-80 transition-transform", open && "rotate-180")} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-3xl p-0">
        <div className="p-6 border-b">
          <DialogTitle>Currency Picker</DialogTitle>
          <DialogDescription>Select your preferred currency.</DialogDescription>

          <div className="mt-4">
            <Input
              placeholder="Search currencies"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="max-h-[60vh] overflow-auto p-6">
          <Section title="Commonly Used Currencies">
            <Grid>
              {common.map((c) => (
                <CurrencyItem
                  key={c.code}
                  c={c}
                  onSelect={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                />
              ))}
            </Grid>
          </Section>
          <Section title="All Other Currencies">
            <Grid>
              {others.map((c) => (
                <CurrencyItem
                  key={c.code}
                  c={c}
                  onSelect={() => {
                    onChange(c.code);
                    setOpen(false);
                  }}
                />
              ))}
            </Grid>
          </Section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children }: React.PropsWithChildren<{ title: string }>) {
  return (
    <div className="mb-8">
      <h4 className="mb-3 text-sm font-semibold text-muted-foreground">{title}</h4>
      {children}
    </div>
  );
}

function Grid({ children }: React.PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-3 md:grid-cols-3">{children}</div>;
}

function CurrencyItem({ c, onSelect }: { c: Currency; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="flex w-full items-start gap-2 rounded-lg border border-border bg-card p-3 text-left hover:border-primary/50 hover:bg-primary/5"
    >
      <img src={`https://flagcdn.com/24x18/${(FLAG_BY_CURRENCY[c.code] || c.code.slice(0,2)).toLowerCase()}.png`} alt={c.code} width={18} height={14} className="rounded-sm" />
      <span className="flex flex-col">
        <span className="text-sm font-medium">{c.code} - {c.symbol}</span>
        <span className="text-xs text-muted-foreground">{c.name}</span>
      </span>
    </button>
  );
}
